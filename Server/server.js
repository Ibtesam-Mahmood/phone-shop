
//Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Router
const apiRouter = require('./routes/api.route');

//Init app
const app = express();

//MongoDB connection
let dev_db_url = "mongodb+srv://admin:admin@cluster0-tufmn.mongodb.net/songio?retryWrites=true&w=majority"; //TODO: Make env variable
mongoose.connect(dev_db_url);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error' , console.error.bind(console, "Mongoose connection error"));

//Parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Primary route for the server is the REST api
app.use('/api', apiRouter);

//The the application
const port = 8080; //TODO: Make env variable
app.listen(port, () => {
  console.log("Server running on port " + port);
});