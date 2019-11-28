
//Holds all the middleware helpers for the REST api

const express = require('express');

//Handles checking if email is unique
exports.email_unique = (req, res, next) => {
  User.findOne({email: req.params.email}, (err) => {
    if(err){
      //No user found so email is unique
      next(); //moves to the next function
    }
    //User found so email is not unique, returns an error
    res.status(403).json({error: true, unique: false});
  });
}