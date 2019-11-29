
const express = require('express');
const router = express.Router();

//Functional controller for the song router
const controller = require('../controllers/song.controller');

//Auth middleware
const auth = require('../middleware/auth.middleware');

//Add new song
router.post('/add', auth.auth, controller.add_song);

//Get song by id
router.get('/get/:id', controller.get_song);

//Get all songs
router.get('/get', controller.get_all_songs);

//Update song information
router.put('/edit/:id', auth.adminAuth, controller.edit_song);

//Delete song
router.delete('/delete/:id', auth.adminAuth, controller.delete_song);


module.exports = router;