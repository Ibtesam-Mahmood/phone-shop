const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

//Environment variables
const privateKey = process.env.PRIVATE_KEY; //Private key of jwt for users
const privateAdminhKey = process.env.PRIMARY_ADMIN_KEY; //Private key of jwt for admins

//Login authentication
exports.auth = async (req, res, next) => {
  try{
    //Tries to verify the users auth token
    let decoded = jwt.verify(req.cookies["auth"], privateKey);
    req.user = await User.findById(decoded.user);
    return next();
  }catch(e){
    //Failed verification
    return res.status(401).json({
      error: true,
      message:"unauthorized. must login to call this end point"
    });
  }
}

//Admin authentication
exports.adminAuth = async (req, res, next) => {
  try{
    //Tries to verify the users auth token
    let decoded = jwt.verify(req.cookies["adminAuth"], privateAdminhKey);
    let user = await User.findById(decoded.user); //Sees if there is a user with an admin key
    if(user.isAdmin){
      //User is an admin
      req.overide = true;
      return next();
    }
  }catch(e){
    
  }

  //Failed verifications
  return res.status(401).json({
    error: true,
    message:"unauthorized. must be an administrator to call this end point"
  });
}

//Manages authenticating if the user making the request if the user logged in
//Has admin override controls
exports.meAuth = async (req, res, next) => {

  //Checks if the user making the request is an admin or is the user removed is the user making the request
  if(req.user._id != req.params.id && !req.user.isAdmin){
    //Returns an unauthorized error
    return res.status(401).json({error: true, content: "Unauthorized"});
  }
  else{
    //User is authenticated to make this request
    next();
  }

};