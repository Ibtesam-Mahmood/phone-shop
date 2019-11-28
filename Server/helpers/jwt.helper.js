const jwt = require('jsonwebtoken');

//Used to sign json web tokens for users and admins

//Environment variables
const privateKey = "Ibtesam"; //TODO: make env variable
const privateAdminhKey = "IbtesamAdmin"; //TODO: make env variable

exports.generateAuthJWT = (id) => {
  return jwt.sign({user: id}, privateKey);
}

exports.generateAdminAuthJWT = (id) => {
  return jwt.sign({user: id}, privateAdminhKey);
}