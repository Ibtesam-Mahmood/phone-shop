const User = require('../models/user.model');
const Verification = require('../models/verification.model')
const bcrypt = require('bcrypt');

//Imports a request handler
const requestHandler = require('../helpers/request.helper');

//Email helper used to send emails
const emailHelper = require('../helpers/email.helper');

//JWT helper
const jwtHelper = require('../helpers/jwt.helper');

const create_verification = (res, email, user) => {
  
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
        return res.status(404).send({error: true, content: "Email not sent"});
      }
    });

  });
}

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

  create_verification(res, email, user);

  
}

//Handles verfiying the user and 
exports.verify_email = (req, res) => {
  // //Verifies the user
  //Deletes the verification object
  Verification.findByIdAndDelete(req.params.id, (err, verify) => {
    if(err || verify == null || verify == undefined){
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
    newUser.save((err, user) => {
      if(err) return res.status(400).json({error: true, content: err});

      //Set logged in auth cookie
      res.cookie('auth', jwtHelper.generateAuthJWT(user._id));
      return res.send("Verified");
    }); //TODO: route to successful verification page
  });
}

//Handles resending the verification email
exports.resend_email = (req, res) => {

  //Removes the old verification object and creates a new one, also sends a new email to the email specified
  Verification.findOneAndDelete({email: req.params.email}, (err, verify) => {

    if(err || verify == null || verify == undefined){
      //onError returns the error
      return res.status(404).send({error: true, content: err});
    }
    
    //Creates anew verification and sends a verification
    create_verification(res, verify.email, verify.user);
  });
}


//Handles logging into the system
exports.login = (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if(err || user == null){
      //onError returns the error
      return res.status(404).send({error: true, content: "No user found with that email"});
    }

    //Non active user
    if(!user.isActive) return res.status(403).send({error: true, content: "User not active"});

    //Verfies user password
    if(!bcrypt.compareSync(req.body.password, user.password)){
      //If password not verifed
      return res.status(401).send({error: true, content: "Incorrect password"});
    }
    else{
      //Password verfied
      if(user.isAdmin){
        //Set admin auth cookie
        res.cookie('adminAuth', jwtHelper.generateAdminAuthJWT(user._id));
      }
      //Set logged in auth cookie
      res.cookie('auth', jwtHelper.generateAuthJWT(user._id));

      return res.json({error: false, user: user});
    }
  });
}