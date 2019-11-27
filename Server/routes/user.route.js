const express = require('express');
const router = express.Router();

//Functional controller for the song router
const controller = require('../controllers/user.controller');

//Getting user by id
router.get('/get/:id', controller.get_user);

//Getting all users
router.get('/get', controller.get_all_users);

//Editting user
router.put('/edit/:id', controller.edit_user);

//Deleting user
router.delete('/delete/:id', controller.delete_user);


module.exports = router;