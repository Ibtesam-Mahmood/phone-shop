const express = require('express');
const router = express.Router();

//Functional controller for the song router
const controller = require('../controllers/user.controller');

//Auth middleware
const auth = require('../middleware/auth.middleware');

//Getting user by id
router.get('/get/:id', controller.get_user);

//Getting all users
router.get('/get', auth.adminAuth, controller.get_all_users);

//Editting user
router.put('/edit/:id', auth.auth, auth.meAuth, controller.edit_user);

//Deleting user
router.delete('/delete/:id', auth.auth, auth.meAuth, controller.delete_user);


module.exports = router;