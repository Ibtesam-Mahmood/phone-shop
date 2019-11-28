const express = require('express');
const router = express.Router();

//Functional controller for the song router
const controller = require('../controllers/auth.controller');

//Middleware import to use middleswares
const middleware = require('../helpers/middleware.helper');

//Creates a new user on the system
router.post('/signup', middleware.email_unique, controller.sign_up);

//Resends the verification code
router.post('/resend-verification/:email', controller.resend_email);

//Confirms the user account
router.get('/email-verification/:id', controller.verify_email);

//logs the user into the system and presents them an auth token
router.post('/login', controller.login);

module.exports = router;