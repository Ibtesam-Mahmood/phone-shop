//Used to send emails for any controller
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

var sendEmail = (to, subject, html, callback = function(val){}) => {

  //transporter for the emails
  const mailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'song.io.verify@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  });

  //Mail options for sending the email
  const mailOptions = {
    from: 'song.io.verify@gmail.com',
    to: to,
    subject: subject,
    html: html
  };

  mailTransporter.sendMail(mailOptions, err => {
    if(err) {
      console.log(err);
      callback(false); //Email not send
    }
    else callback(true); //Email sent
  });
};

exports.send_email = sendEmail;

//Sending the verification email
exports.send_verification_email = (email, code, callback = function(val){}) => {
  let URL = 'http://localhost:8080/api/auth/email-verification/' + code;
  return sendEmail(
    email,
    "Please confirm account",
    "Click the following link to confirm your account:</p><p><a href='" + URL + "'>Link</a></p>",
    callback
  )
}