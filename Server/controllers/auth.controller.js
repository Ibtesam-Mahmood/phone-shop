const User = require('../models/user.model');
const nev = require('../helpers/verification.helper');
const bcrypt = require('bcrypt');

//Imports a request handler
const requestHandler = require('../helpers/request.helper');

//Handles creating a temp user and sending the verification code
exports.sign_up = (req, res) => {

  //The email for the new user
  const email = req.body.email;

  //Creates a new user from the request body
  const user = new User({
    email: email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isAdmin: false,
    isActive: true,
    password: req.body.password //Password hashing occurs in email verification functions
  });

  nev.createTempUser(user, (err, userExsists, tempUser) => {
    if(err){
      //onError returns the error
      return res.status(404).json({error: true, content: err})
    }
    //User already exsists
    else if(userExsists){
      //Sends a response if the user already exsists
      return res.status(400).json({error: true, content: "User already exsists"})
    }
    //New user creation
    else if (tempUser){
      let URL = tempUser[nev.options.URLFieldName];

      nev.sendVerificationEmail(email, URL, (err, info) => {
        if (err) {
          //onError returns the error
          return res.status(404).send({error: true, content: err});
        }
        //Returns a confirmation response
        res.json({
          error: false,
          content: 'An email has been sent to you. Please check it to verify your account.',
          info: info
        });
      })
    }
    //temp user exsists and email not verified
    else{
      //Returns a confirmation response
      res.status(400).json({
        error: true,
        content: 'Account has already been created, check your email for verification',
      });
    }
  });
}

//Handles verfiying the user and 
exports.verify_email = (req, res) => {
  //Verifies the user
  nev.confirmTempUser(req.params.URL, (err, user) => requestHandler.generic(res, err, user, "user"));
}

//Handles resending the verification email
exports.resend_email = (req, res) => {
  nev.resendVerificationEmail(req.params.email, (err, userFound) => {
    if (err) {
      //onError returns the error
      return res.status(404).send({error: true, content: err})
    }
    if (userFound) {
        res.json({
          error: false,
          msg: 'An email has been sent to you, yet again. Please check it to verify your account.'
        });
    } else {
        res.status(400).json({
          error: true,
          msg: 'Your verification code has expired. Please sign up again.'
        });
    }
  })
}

//Handles logging into the system
exports.login = (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if(err){
      //onError returns the error
      return res.status(404).send({error: true, content: "No user found with that email"});
    }

    //Verfies user password
    if(!bcrypt.compareSync(req.body.password, user.password)){
      //If password not verifed
      return res.status(401).send({error: true, content: "Incorrect password"});
    }
    else{
      //Password verfied
      return res.json({error: false, user: user});
    }
  })
}