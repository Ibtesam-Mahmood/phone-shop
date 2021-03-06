
const express = require('express');
const router = express.Router();

//Functional controller for the song router
const controller = require('../controllers/song.controller');

//Auth middleware
const auth = require('../middleware/auth.middleware');

//Add new song
router.post('/add', auth.auth, controller.add_song);

//Getting all the songs posted by a user
router.get('/get/user/:id', controller.get_songs_by_user);

//Get song by id
router.get('/get/:id', controller.get_song);

//Get all songs
router.get('/get', controller.get_all_songs);

//Update song information
router.put('/edit/:id', auth.auth, controller.edit_song);

//Delete song
router.delete('/delete/:id', auth.auth, controller.delete_song);


module.exports = router;