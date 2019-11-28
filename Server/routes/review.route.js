const express = require('express');
const router = express.Router();

//Functional controller for the song router
const controller = require('../controllers/review.controller');

//New review
router.post('/add/:song/:user', controller.post_review);

//All reviews for a song
router.get('/get/song/:id', controller.get_song_reviews);

//All reviews for a user
router.get('/get/user/:id', controller.get_user_reviews);

//Review by id
router.get('/get/:id', controller.get_review);

//All reviews on the system
router.get('/get', controller.get_all_reviews);

//Edit review
router.put('/edit/:id', controller.edit_review);

//Delete review
router.delete('/delete/:id', controller.delete_review);


module.exports = router;