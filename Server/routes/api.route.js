const express = require('express');
const router = express.Router();

//Api Router used to add /api infront of all REST api routes

//Route imports
const songRoute = require('./song.route');

//Using routers
router.use('/songs', songRoute);


module.exports = router;