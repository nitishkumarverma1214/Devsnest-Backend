const express = require("express");
const router = express.Router();
const app = express();
const bcrypt = require("bcrypt");
const { validateEmail, validatePassword } = require("../utils/validators.js");
let users = {};

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const userExits = users.hasOwnProperty(email);
    if (userExits) {
      return res.send("user exists");
    }
    if (!validateEmail(email)) {
      return res.send("Email is not valid");
    }
    if (!validatePassword(password)) {
      return res.send("Password is not valid");
    }
    const Epassword = await bcrypt.hash(password, 10);
    users[email] = { password: Epassword };
    console.log(users[email]);
    console.log(users[email].password);
    return res.send("success");
  } catch (e) {
    return res.send(e.message);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const userExits = users.hasOwnProperty(email);
    if (userExits) {
      const passMatch = await bcrypt.compare(password, users[email].password);

      if (passMatch) {
        return res.send("login successful");
      } else {
        return res.send("wrong password");
      }
    } else {
      return res.send("User does not exists");
    }
  } catch (e) {
    return res.send(e.message);
  }
});
module.exports = router;
