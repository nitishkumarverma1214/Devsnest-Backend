const { USER_EMAIL, USER_PASSWORD } = require("../config.js/credentials");
const nodemailer = require("nodemailer");
const SMTP_PORT = 587;
const HOST_SERVICE = "smtp-relay.sendinblue.com";
const SENDER_MAIL = USER_EMAIL;
const TO_MAIL = "abc@gmail.com";
const CC = [];
const BCC = [];
const EMAIL_BODY_HTML = "<h1>Hey Good Evening!!! Start ur Jenkins :) </h1>";
const EMAIL_SUBJECT = "Greeting";

const transporter = nodemailer.createTransport({
  host: HOST_SERVICE,
  port: SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: USER_EMAIL, // generated sendinblue user
    pass: USER_PASSWORD, // generated sendinblue password
  },
});

const options = {
  from: SENDER_MAIL,
  to: TO_MAIL,
  cc: CC,
  bcc: BCC,
  subject: EMAIL_SUBJECT,
  html: EMAIL_BODY_HTML,
};

module.exports = { transporter, options };
