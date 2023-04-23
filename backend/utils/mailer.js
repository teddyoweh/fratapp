"use strict";
const nodemailer = require("nodemailer");
const ip = require('../ip');

function sendEmail(email,code) {

let transporter = nodemailer.createTransport({
host: "smtp.titan.email",
port: 465,
secure: true,
auth: {
user: "info@beardb.net",
pass: process.env.EMAIL_PASSWORD
},
});

let info = transporter.sendMail({
from: '"Union " <info@beardb.net>',
to: email,
subject: "Union - Verification Code",
text: "Hello world?",
html: "Code: " + code,
});

console.log("Message sent: %s", info.messageId);
return true;
}
function emailHtml(firstname,link){
    const logo =`http://${ip}:9990/images/assets/union.png`
    
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Union - Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #ffffff;
            color: #333333;
            margin: 0;
            padding: 0;
        }    .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
    
        .logo {
            margin-bottom: 20px;
        }
    
        .message {
            font-size: 1.1em;
            margin-bottom: 40px;
        }
    
        .button {
            display: inline-block;
            background-color: #D030D0;
            color: white;
            text-decoration: none;
            font-size: 1.1em;
            padding: 12px 24px;
            border-radius: 5px;
            transition: background-color 0.2s;
        }
    
        .button:hover {
            background-color: #D030D0;
        }
    
        .footer {
            font-size: 0.9em;
            color: #999999;
            margin-top: 40px;
        }
    </style>
     

    </head>
    <body>
      
        <img class="logo" src="${logo}" alt="Union Logo" width="150" />
        <h2>${firstname}</h2>
        <p class="message">Thank you for signing up with Union! Please click the button below to verify your email address:</p>

        <a href="https://yourdomain.com/verify?token=your_verification_token" class="button">Verify Email</a>
    
        <p class="footer">If you didn't request this, please ignore this email.</p>
    </div>
                
    `
}
module.exports ={sendEmail,emailHtml}

