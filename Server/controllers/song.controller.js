
const Song = require('../models/song.model');
const Review = require('../models/review.model');

//Imports a request handler
const requestHandler = require('../helpers/request.helper');

//Appends the review content data for the song onto the song
const add_review_content = async (res, song) => {

  let fullSong = {...song._doc}; //Deconstructs the song document
  let songReviews;
  
  //Gets all reviews for a song
  await Review.find({songID: song._id}, (err, reviews) => {
    if(err || reviews == null || reviews == undefined) return res.status(404).json({error: true, content: err});
    else songReviews = reviews;
  });

  let songReviewCount = songReviews.length; //Amount of reviews
  let avgSongRating = 0; //Rating for the song
  songReviews.forEach((review) => avgSongRating += review.rating);

  fullSong['rating'] = songReviewCount == 0 ? 0 : Math.round( avgSongRating / songReviewCount * 10 ) / 10; //Error checks if count is zero, onnly returns 1 decimal place
  fullSong['reviews'] = songReviewCount;
  
  return fullSong; //Returns the full song with the rating values
}

//Handles adding a song to the database
exports.add_song = (req, res) => {

  //New song defined by the body of the request
  let newSong = new Song({
    name: req.body.name,
    album: req.body.album,
    artist: req.body.artist,
    img: req.body.img,
    releaseDate: req.body.releaseDate
  });
  //Attempts to add the song to the database
  newSong.save((err, song) => requestHandler.generic(res, err, song, "song"));
}

//Handles finding song by id
exports.get_song = (req, res) => {
  Song.findById(req.params.id, async (err, song) => requestHandler.generic(res, err, await add_review_content(res, song), "Song"));
}

//Handles getting all songs
exports.get_all_songs = (req, res) => {

  //Adds reviews to each song
  let itterate_and_add_reviews = async (songs) => {
    let songsWithReviews = [];
    
    for(const song of songs){
      let fullSong = await add_review_content(res, song);
      songsWithReviews.push(fullSong);
    }
    
    return songsWithReviews;
  }

  Song.find({}, async (err, songs) => requestHandler.generic(res, err, await itterate_and_add_reviews(songs), "songs"));
}

exports.edit_song = (req, res) => {
  Song.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, song) => requestHandler.generic(res, err, "Updated", "message"));
}

exports.delete_song = (req, res) => {
  Song.findByIdAndDelete(req.params.id, (err, song) => requestHandler.generic(res, err, "Deleted", "message"));
}