"use strict";
const nodemailer = require("nodemailer");

function sendEmail(email,code) {

let transporter = nodemailer.createTransport({
host: "smtp.titan.email",
port: 465,
secure: true,
auth: {
user: "info@beardb.net",
pass: "!@!@Deniboy9",
},
});

let info = transporter.sendMail({
from: '"Afterhours " <info@beardb.net>',
to: email,
subject: "Verification Code",
text: "Hello world?",
html: "Code: " + code,
});

console.log("Message sent: %s", info.messageId);
return true;
}

module.exports ={sendEmail}

