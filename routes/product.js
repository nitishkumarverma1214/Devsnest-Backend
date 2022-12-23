const express = require("express");
const upload = require("../utils/fileUpload");
const { isAuthenticated, isSeller, isBuyer } = require("../middlewares/auth");
const Product = require("../models/productModel");
// enter your stripe key in the stripe-config.js
const STRIPE_KEY = require("../config/stripe-config.js");
const Order = require("../models/orderModel");

const stripe = require("stripe")(STRIPE_KEY);
const router = express.Router();

const { WebhookClient } = require("discord.js");

const webhook = new WebhookClient({
  url: "https://discord.com/api/webhooks/1055495301819015230/utEZqt8u96q4_jacZzrD_v2VS1xTQlrZkV5kWoZ6A_4k_3bmFwxhPjAK7_TEDaZ5ogzl",
});

router.post("/create", isAuthenticated, isSeller, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    const { name, price } = req.body;
    console.log(req.file, price, name);
    if (!name || !price || !req.file) {
      return res.status(400).json({ err: "require all three" });
    }
    if (Number.isNaN(price)) {
      return res.status(400).json({ err: "price should be number" });
    }
    let productDetails = {
      name,
      price,
      content: req.file.path,
    };
    const savedProduct = await Product.create(productDetails);
    return res.status(200).json({
      status: "ok",
      productDetails: savedProduct,
    });
  });
});

router.get("/all", isAuthenticated, async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({ products });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ err: "Something went wrong" });
  }
});

router.post("/buy/:productId", isAuthenticated, isBuyer, async (req, res) => {
  try {
    const productId = req.params.productId;

    let product = await Product.findOne({
      where: {
        id: productId,
      },
    });
    product = product?.dataValues;
    if (!product) {
      return res.status(404).json({ err: "Product not found" });
    }
    const orderDetails = {
      productId,
      buyerId: req.user.id,
    };

    let paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: "4242424242424242",
        exp_month: 9,
        exp_year: 2023,
        cvc: "314",
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price,
      currency: "inr",
      payment_method_types: ["card"],
      payment_method: paymentMethod.id,
      confirm: true,
    });

    if (paymentIntent) {
      const createdOrder = await Order.create(orderDetails);
      webhook.send({
        content: `Sending it from Day10 order id: ${createdOrder.id}`,
        username: "order-keeper",
        avatarURL: "https://i.imgur.com/oBPXx0D.png",
      });
      return res.status(200).json({ orderDetails: createdOrder });
    } else {
      return res.status(400).json({ err: "payment failed" });
    }
  } catch (error) {
    console.log(">>>", error.message);
    return res.status(500).json({ err: "Something went wrong" });
  }
});

module.exports = router;
