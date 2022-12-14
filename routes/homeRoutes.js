const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  const htmlPath = path.join(process.cwd(), "public", "index.html");
  res.status(200).sendFile(htmlPath);
});

module.exports = router;
