const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  validateEmail,
  validatePassword,
  validateUsername,
} = require("../utils/validators");

const User = require("../models/userModel");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, isSeller } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(403).json({ err: "User Already exists" });
    }

    if (!validateUsername(name)) {
      return res.status(400).send("Invalid username");
    }
    if (!validateEmail(email)) {
      return res.status(400).send("Invalid Email");
    }
    if (!validatePassword(password)) {
      return res.status(400).send("Invalid username/password");
    }

    const hashedPassword = await bcrypt.hash(password, (saltOrRounds = 10));

    const user = {
      name,
      email,
      password: hashedPassword,
      isSeller,
    };
    const newUser = await User.create(user);

    return res.status(201).json({ message: `Welcome User` });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).send("Invalid Email");
    }
    if (!validatePassword(password)) {
      return res.status(400).send("Invalid username/password");
    }
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(400).json({ err: "User doesn't exists" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(400).json({ err: "email or password doesn't match" });
    }
    const payload = { user: { id: existingUser.id } };
    const bearerToken = await jwt.sign(payload, "SECRETMESSAGE", {
      expiresIn: 360000,
    });
    res.cookie("token", bearerToken, { expires: new Date(Date.now() + 9999) });
    res.status(200).json({ bearerToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!!");
  }
});

router.get("/signout", async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ message: "cookie deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!!");
  }
});

router.get("/all", async (req, res) => {
  try {
    const allUser = await User.findAll();

    return res.status(200).json({ users: allUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!!");
  }
});
module.exports = router;
