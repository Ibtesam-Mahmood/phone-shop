const User = require('../models/user.model');

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
  User.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, user) => requestHandler.generic(res, err, "Updated", "message"));
}

exports.delete_user = (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, user) => requestHandler.generic(res, err, "Deleted", "message"));
}