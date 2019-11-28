
//Holds all the middleware helpers for the REST api
const User = require('../models/user.model');
const Verification = require('../models/verification.model')


//Handles checking if email is unique
exports.email_unique = (req, res, next) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if(err || user == null){
      //No user found so email is unique
      //Checks if there are any outstanding verifications that have not been 
      Verification.findOne({email: req.body.email}, (err, verify) => {
        if(err || verify == null){
          //No outstanding verification found, email unique
          return next(); //moves to the next function
        }
        //Exsisting verification found, email not unique
        //Prompts to check if email has already been sent
        return res.status(400).json({error: true, content: "Account already crated, Check your email for the activation link"});
      })
    }
    else
      //User found so email is not unique, returns an error
      return res.status(403).json({error: true, unique: false});
  });
}