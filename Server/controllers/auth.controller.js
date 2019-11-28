const User = require('../models/user.model');
const Verification = require('../models/verification.model')
const bcrypt = require('bcrypt');

//Imports a request handler
const requestHandler = require('../helpers/request.helper');

//Email helper used to send emails
const emailHelper = require('../helpers/email.helper');

//Handles creating a temp user and sending the verification code
exports.sign_up = (req, res) => {

  //The email for the new user
  const email = req.body.email;

  //Creates a new user from the request body
  const user = new User({
    email: email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null) //Hashes the pass
  });

  const verification = new Verification({email: email, user : user});

  verification.save((err, verify) => {

    if(err){
      //onError returns the error
      return res.status(404).send({error: true, content: err});
    }
    
    emailHelper.send_verification_email(email, verify._id, (sent) => {
      if(sent){
        //Email sent
        return res.json({error: false, content: "An email has been sent to you. Please check it to verify your account."})
      }
      else{
        //onError returns the error
        verification.remove(); //removes the verification object from the database
        return res.status(400).send({error: true, content: "Email not sent"});
      }
    });

  });

  // nev.createTempUser(user, (err, userExsists, tempUser) => {
  //   if(err){
  //     //onError returns the error
  //     return res.status(404).json({error: true, content: err})
  //   }
  //   //User already exsists
  //   else if(userExsists){
  //     //Sends a response if the user already exsists
  //     return res.status(400).json({error: true, content: "User already exsists"})
  //   }
  //   //New user creation
  //   else if (tempUser){
  //     let URL = tempUser[nev.options.URLFieldName];

  //     res.send('created');

  //     nev.sendVerificationEmail(email, URL, (err, info) => {
  //       if (err) {
  //         //onError returns the error
  //         return res.status(404).send({error: true, content: err});
  //       }
  //       //Returns a confirmation response
  //       res.json({
  //         error: false,
  //         content: 'An email has been sent to you. Please check it to verify your account.',
  //         info: info
  //       });
  //     });
  //   }
  //   //temp user exsists and email not verified
  //   else{
  //     //Returns a confirmation response
  //     res.status(400).json({
  //       error: true,
  //       content: 'Account has already been created, check your email for verification',
  //     });
  //   }
  // });
}

//Handles verfiying the user and 
exports.verify_email = (req, res) => {
  // //Verifies the user
  //Deletes the verification object
  Verification.findByIdAndDelete(req.params.id, (err, verify) => {
    if(err){
      //onError returns the error
      return res.status(404).send({error: true, content: err});
    }

    //Verify user account and create user
    const newUser = new User({
      email: verify.user.email,
      firstName: verify.user.firstName,
      lastName: verify.user.lastName,
      isAdmin: false,
      isActive: true,
      password: verify.user.password
    });
    newUser.save((err, user) => requestHandler.generic(res, err, user, "User")); //TODO: route to successful verification page
  });
}

//Handles resending the verification email
exports.resend_email = (req, res) => {

  //Removes the old verification object and creates a new one, also sends a new email to the email specified
  Verification.findOneAndDelete({email: req.params.email}, (err, verify) => {
    const newVerification = new Verification({email: verify.email, user: verify.user});

    //Create a new verification object
    newVerification.save((err, verify) => {

      if(err){
        //onError returns the error
        return res.status(404).send({error: true, content: err});
      }
      
      emailHelper.send_verification_email(req.params.email, verify._id, (sent) => {
        if(sent){
          //Email sent
          return res.json({error: false, content: "An email has been sent to you. Please check it to verify your account."})
        }
        else{
          //onError returns the error
          newVerification.remove(); //removes the verification object from the database
          return res.status(400).send({error: true, content: "Email not sent"});
        }
      });
  
    });
  })
  // nev.resendVerificationEmail(req.params.email, (err, userFound) => {
  //   if (err) {
  //     //onError returns the error
  //     return res.status(404).send({error: true, content: err})
  //   }
  //   if (userFound) {
  //       res.json({
  //         error: false,
  //         msg: 'An email has been sent to you, yet again. Please check it to verify your account.'
  //       });
  //   } else {
  //       res.status(400).json({
  //         error: true,
  //         msg: 'Your verification code has expired. Please sign up again.'
  //       });
  //   }
  // });
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