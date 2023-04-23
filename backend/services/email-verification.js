var mailer = require("nodemailer");

function sendEmail(email, firstname, lastname) {
    var transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tedddyoweh@gmail.com',
         
        }
    });
    const Body = `<h1>Hello ${firstname} ${lastname}</h1>`
    var mailOptions = {
        from: '',
        to: email,
        subject: 'Tarleton Voice Out - Verify your email',
        text: Body,
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
 