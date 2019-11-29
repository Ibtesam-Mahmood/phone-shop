const express = require('express');
const router = express.Router();

//Api Router used to add /api infront of all REST api routes

//Route imports
const songRoute = require('./song.route');
const userRoute = require('./user.route');
const reviewRoute = require('./review.route');
const authRoute = require('./auth.route');
const adminRoute = require('./admin.route');

//Auth middleware
const auth = require('../middleware/auth.middleware');

//Using routers
router.use('/songs', songRoute);
router.use('/user', userRoute);
router.use('/review', reviewRoute);
router.use('/auth', authRoute);
router.use('/admin', auth.adminAuth, adminRoute);


module.exports = router;