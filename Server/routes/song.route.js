
const express = require('express');
const router = express.Router();

//Functional controller for the song router
const controller = require('../controllers/song.controller');

//Add new song
router.post('/add', controller.add_song);

//Get song by id
router.get('/get/:id', controller.get_song);

//Get all songs
router.get('/get', controller.get_all_songs);

//Update song information
router.put('/update/:id', controller.edit_song);

//Delete song
router.delete('/delete/:id', controller.delete_song);


module.exports = router;