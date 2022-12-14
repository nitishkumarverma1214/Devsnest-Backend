const express = require("express");
const router = express.Router();

const createDB = require("../config/dbconfig");
const Url = require("../models/urlModel");
createDB.sync().then(() => {
  console.log("connected to db");
});
router.post("/", async (req, res) => {
  try {
    const shortId = Math.random();

    console.log(ID);
    const { longUrl } = req.body;
    const shortUrl = await Url.create({ longUrl, shortId });

    return res
      .status(201)
      .json({ status: "ok", url: `http://localhost:3000/shorturl/${shortId}` });
  } catch (error) {
    console.log(error.message);
    return res.send(500).send(error.message);
  }
});

router.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  const url = await Url.findOne({
    where: {
      shortId,
    },
  });
  console.log(url);
  if (url) {
    return res.status(200).redirect(url.longUrl);
  } else {
    return res.status(400).send("Invalid Url");
  }
});

module.exports = router;
