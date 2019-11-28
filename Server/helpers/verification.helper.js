//Helper that builds the email verfication handler for sign up api
const mongoose = require('mongoose');
const nev = require('email-verification')(mongoose);
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

//Hashing password for password

// sync version of hashing function
var myHasher = function(password, tempUserData, insertTempUser, callback) {
  var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  return insertTempUser(hash, tempUserData, callback);
};

//configures the email verification system
nev.configure({
  verificationURL: 'http://localhost:8080/api/auth/email-verification/${URL}', //TODO: make env variable
  persistentUserModel: User,
  expirationTime: 600,
  tempUserCollection: 'tempUser',
  shouldSendConfirmation: false,
  transportOptions: {
      service: 'Gmail',
      auth: {
          user: 'song.io.verify@gmail.com', //Emails for verification
          pass: 'ibtesam10' //TODO: make env variable
      }
  },
  //Verification email format
  verifyMailOptions: {
      from: 'Do Not Reply <song.io.verify@gmail.com>',
      subject: 'Please confirm account',
      html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
      text: 'Please confirm your account by clicking the following link: ${URL}'
  },
  hashingFunction: myHasher,
  passwordFieldName: 'password',
}, function(error, options){
  if (error) {
    console.log(err);
    return;
  }

  console.log('configured: ' + (typeof options === 'object'));
});

//Genenrates a temp user model for email verification
nev.generateTempUserModel(User, function(err, tempUserModel) {
  if (err) {
      console.log(err);
      return;
  }

  console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});

module.exports = nev;

