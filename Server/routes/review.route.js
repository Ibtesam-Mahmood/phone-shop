const express = require('express');
const router = express.Router();

//Functional controller for the song router
const controller = require('../controllers/review.controller');

//New review
router.post('/add/:song/:user');

//All reviews for a song
router.get('/get/song/:id');

//All reviews for a user
router.get('/get/user/:id');

//Review by id
router.get('/get/:id');

//All reviews on the system
router.get('/get');

//Edit review
router.put('/edit/:id');

//Delete review
router.delete('/delete/:id');


module.exports = router;