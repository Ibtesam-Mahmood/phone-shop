
//Imports
const express = require('express');
const mongoose = require('mongoose');

//Init app
const app = express();

//MongoDB connection
let dev_db_url = "mongodb+srv://admin:admin@cluster0-tufmn.mongodb.net/songioa?retryWrites=true&w=majority"; //TODO: Make environment variable
mongoose.connect(dev_db_url);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error' , console.error.bind(console, "Mongoose connection error"));



//The the application
const port = 8080; //TODO: Make environment variable
app.listen(port, () => {
  console.log("Server running on port " + port);
});