const Review = require('../models/review.model');

//Imports a request handler
const requestHandler = require('../helpers/request.helper');

//Handles adding a new reivew to a post by a user
exports.post_review = (req, res) => {
  let review = new Review({
    userID: req.user._id, //Pulls the user oid from the logged in user
    songID: req.params.song,
    content: req.body.content,
    rating: req.body.rating,
    date: Date.now()
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
  Review.find({}, (err, reviews) => requestHandler.generic(res, err, reviews, "reviews"));
}

//Gets the song review meta data
exports.get_song_review_data = (req, res) => {
  //Gets all reviews for a song
  Review.find({songID: req.params.id}, (err, reviews) => {
    if(err) return res.status(404).json({error: true, content: err});
    else if(reviews == undefined || reviews == null){
      //No reviews found
      return res.json({error: false, rating: 0, reviews: 0});
    }
    else{
      //Reviews found, calculate review data
      let songReviewCount = reviews.length; //Amount of reviews
      let avgSongRating = 0; //Rating for the song
      reviews.forEach((review) => avgSongRating += review.rating);
      let rating = songReviewCount == 0 ? 0 : Math.round( avgSongRating / songReviewCount * 10 ) / 10; //Error checks if count is zero, onnly returns 1 decimal place

      //Returns the calculated data
      return res.json({error: false, rating: rating, reviews: songReviewCount});
      
    }
  });

  
}

exports.edit_review = (req, res) => {

  let editReview = {}

  //Check for null value
  if(req.body.rating != null && req.body.rating != undefined){
    //Only edit rating if its in range
    if(req.body.rating <= 5 && req.body.rating >= 1){
      editReview.rating = req.body.rating;
    }
    else{
      //If range error
      return res.status(400).json({error: true, content: "Rating must be between [1-5]"});
    }
  }

  if(req.body.content != null && req.body.content != undefined){
    editReview.content = req.body.content;
  }

  return Review.findById(req.params.id, (err, review) => {
    if((review.userID + "") != req.user._id && !req.user.isAdmin){
      //Unauthorized request
      return res.status(401).json({error: true, content: "Unauthorized"});
    }

    //Only updates content and rating, only works if authorized
    return Review.findByIdAndUpdate(req.params.id, {$set: editReview}, (err, review) => requestHandler.generic(res, err, "Updated", "message"));
  });
}

exports.delete_review = (req, res) => {
  Review.findById(req.params.id, (err, review) => {
    //Checks if the logged in user is allowed to make this request
    if((review.userID + "") != req.user._id && !req.user.isAdmin){
      //Unauthorized request
      return res.status(401).json({error: true, content: "Unauthorized"});
    }
    //Deletes the review
    return review.remove(err => requestHandler.generic(res, err, "Deleted", "message"));
  });
}