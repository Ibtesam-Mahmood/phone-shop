const User = require('../models/user.model');
const bcrypt = require('bcrypt');

//Imports a request handler
const requestHandler = require('../helpers/request.helper');

//Handles getting user by id
exports.get_user = (req, res) => {
  User.findById(req.params.id, (err, user) => requestHandler.generic(res, err, user, "user"));
}

//Handles getting all users
exports.get_all_users = (req, res) => {
  User.find({}, (err, users) => requestHandler.generic(res, err, users, "users"));
}

exports.edit_user = (req, res) => {

  //Checks if the user making the request is an admin or is the user edited is the user making the request
  if(req.user._id != req.params.id && !req.user.isAdmin){
    //Returns an unauthorized error
    return res.status(401).json({error: true, content: "Unauthorized"});
  }

  //Only lets you edit certain fields about the user
  let editUser = {}

  //Checks if body contains edit fields and applies them to edit user
  if(req.body.password != null && req.body.password != undefined){
    editUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
  }

  if(req.body.lastName != null && req.body.lastName != undefined){
    editUser.lastName = req.body.lastName;
  }

  if(req.body.firstName != null && req.body.firstName != undefined){
    editUser.firstName = req.body.firstName;
  }

  if(req.body.email != null && req.body.email != undefined){
    editUser.email = req.body.email;
  }

  User.findByIdAndUpdate(req.params.id, {$set: editUser}, (err, user) => requestHandler.generic(res, err, "Updated", "message"));
}

exports.delete_user = (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, user) => requestHandler.generic(res, err, "Deleted", "message"));
}