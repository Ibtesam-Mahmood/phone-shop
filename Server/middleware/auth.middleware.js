const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

//Environment variables
const privateKey = "Ibtesam"; //TODO: make env variable
const privateAdminhKey = "IbtesamAdmin"; //TODO: make env variable

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