
//Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

//Router
const apiRouter = require('./routes/api.route');

//Init app
const app = express();

//MongoDB connection
let dev_db_url = process.env.MONGODB_URL; //TODO: Make env variable
mongoose.connect(dev_db_url);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error' , console.error.bind(console, "Mongoose connection error"));

//Parsing middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Primary route for the server is the REST api
app.use('/api', apiRouter);

//The the application
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server running on port " + port);
});