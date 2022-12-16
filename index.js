const express = require("express");
const schedular = require("node-cron");
const { transporter, options } = require("./service/email");
const app = express();

schedular.schedule("* * * * *", () => {
  console.log("sending mail");
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.err(err);
    }
    console.log("email send with info= ", info);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("app is running at port", PORT);
});
