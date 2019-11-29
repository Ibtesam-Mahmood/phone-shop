const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

//Used to sign json web tokens for users and admins

//Environment variables
const privateKey = process.env.PRIVATE_KEY; //Private key of jwt for users
const privateAdminhKey = process.env.PRIMARY_ADMIN_KEY; //Private key of jwt for admins

exports.generateAuthJWT = (id) => {
  return jwt.sign({user: id}, privateKey);
}

exports.generateAdminAuthJWT = (id) => {
  return jwt.sign({user: id}, privateAdminhKey);
}