const Review = require('../models/review.model');
const mongoose = require('mongoose');

//Imports a request handler
const requestHandler = require('../helpers/request.helper');

//Handles adding a new reivew to a post by a user
exports.post_review = (req, res) => {
  let review = new Review({
    userID: req.pararms.user,
    songID: req.params.song,
    content: req.body.content,
    rating: req.body.rating
  });

  review.save((err, review) => requestHandler.generic(res, err, review, "review"));
}

//Handles getting all reviews on a song
exports.get_song_reviews = (req, res) => {
  Review.find({songID: req.params.id}, (err, reviews) => requestHandler.generic(res, err, reviews, "reviews"));
}

//Handles getting all reviews posted by a user
exports.get_user_reviews = (req, res) => {
  Review.find({userID: req.params.id}, (err, reviews) => requestHandler.generic(res, err, reviews, "reviews"));
}

//Handles getting all review by id
exports.get_review = (req, res) => {
  Review.findById(req.params.id, (err, review) => requestHandler.generic(res, err, review, "review"));
}

exports.get_all_reviews = (req, res) => {
  Review.find({}, (err, review) => requestHandler.generic(res, err, review, "review"));
}

exports.edit_review = (req, res) => {
  Review.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, review) => requestHandler.generic(res, err, "Updated", "message"));
}

exports.delete_review = (req, res) => {
  Review.findByIdAndDelete(req.params.id, (err, review) => requestHandler.generic(res, err, "Deleted", "message"));
}