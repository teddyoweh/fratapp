"use strict";
const nodemailer = require("nodemailer");
const ip = require('../ip');

function sendEmail(email,code) {

let transporter = nodemailer.createTransport({
host: "smtp.titan.email",
port: 465,
secure: true,
auth: {
user: "team@herds.app",
pass: process.env.EMAIL_PASSWORD
},
});

let info = transporter.sendMail({
from: '"Herds " <team@herds.app>',
to: email,
subject: "Herds - Verification Code",
text: "Hello world?",
html:code
});

console.log("Message sent: %s", info.messageId);
return true;
}
function emailHtml(firstname,code){
    const logo =`https://www.herds.app/`
    
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
        b{
            font-size: 1.5em;
            color: #D030D0;
            margin-top: 40px;
            text-spacing:1px;
        }
    </style>
     

    </head>
    <body>
      
        <img class="logo" src="${logo}" alt="Union Logo" width="150" />
        <h2>${firstname}</h2>
        <p class="message">Thank you for signing up with Herds! Please use the verification code below to verify your email address</p>
        <b>
        ${code}
        </b>    
        <p class="footer">If you didn't request this, please ignore this email.</p>
    </div>
                
    `
}
module.exports ={sendEmail,emailHtml}

