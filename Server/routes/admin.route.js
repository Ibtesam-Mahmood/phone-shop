const express = require('express');
const router = express.Router();

//Functional controller for the song router
const controller = require('../controllers/admin.controller');

//Hide and unhide song
router.post('/toggle/song/:id', controller.toggle_song);

//Activate or unactivate a user
router.post('/toggle/user/:id', controller.toggle_user);

//Promotes/Demotes an admin
router.post('/toggle/admin/:id', controller.toggle_admin);

module.exports = router;