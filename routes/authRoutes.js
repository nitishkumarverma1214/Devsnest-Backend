const express = require("express");
const router = express.Router();
const app = express();
const bcrypt = require("bcrypt");
const dbConn = require("../config/dbconfig");
const { validateEmail, validatePassword } = require("../utils/validators.js");
const User = require("../models/userModels");
const { findOne } = require("../models/userModels");

//This creates the table if it doesn't exist (and does nothing if it already exists)
//to automatically synchronize all models.
dbConn.sync().then(() => {
  console.log("DB is running.");
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const userExits = await User.findOne({ where: { email } });
    if (userExits) {
      return res.status(403).send("user exists");
    }
    if (!validateEmail(email)) {
      return res.status(400).send("Email is not valid");
    }
    if (!validatePassword(password)) {
      return res.status(400).send("Password is not valid");
    }
    const Epassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({ email, password: Epassword });

    return res.status(201).send(createdUser);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const userExits = await User.findOne({ where: { email } });
    if (userExits) {
      const passMatch = await bcrypt.compare(password, userExits.password);

      if (passMatch) {
        return res.send("login successful");
      } else {
        return res.send("wrong password");
      }
    } else {
      return res.send("User does not exists");
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
});
module.exports = router;
