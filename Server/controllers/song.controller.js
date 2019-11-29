
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

  if(songReviews == undefined || songReviews == null) return song;

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
    poster: req.user._id, //Pulls the poster id from the user logged in
    album: req.body.album,
    artist: req.body.artist,
    img: req.body.img,
    releaseDate: req.body.releaseDate,
    hidden: false
  });
  //Attempts to add the song to the database
  newSong.save((err, song) => requestHandler.generic(res, err, song, "song"));
}

//Handles finding song by id
exports.get_songs_by_user = (req, res) => {

  //Adds reviews to each song
  let itterate_and_add_reviews = async (songs) => {
    let songsWithReviews = [];
    
    for(const song of songs){
      let fullSong = await add_review_content(res, song);
      songsWithReviews.push(fullSong);
    }
    
    return songsWithReviews;
  }

  Song.find({poster: req.params.id}, async (err, songs) => requestHandler.generic(res, err, await itterate_and_add_reviews(songs), "Songs"));
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

  //The params for the query
  let queryParams = {};

  if(req.query.hidden != null || req.query.hidden != undefined ){
    queryParams.hidden = req.query.hidden;
  }

  //Only gets non hidden songs
  Song.find(queryParams, async (err, songs) => requestHandler.generic(res, err, await itterate_and_add_reviews(songs), "Songs"));
}

exports.edit_song = (req, res) => {

  //Only lets you edit certain fields about the song
  let editSong = {}

  //Checks if body contains edit fields and applies them to edit user
  if(req.body.name != null && req.body.name != undefined){
    editSong.password = req.body.name;
  }

  if(req.body.artist != null && req.body.artist != undefined){
    editSong.artist = req.body.artist;
  }

  if(req.body.album != null && req.body.album != undefined){
    editSong.album = req.body.album;
  }

  if(req.body.img != null && req.body.img != undefined){
    editSong.img = req.body.img;
  }

  Song.findById(req.params.id, (err, song) => {

    if(err){
      //onError return error
      return res.status(404).json({error: true, content: err});
    }

    //Checks if the logged in user is allowed to make this request
    if((song.poster + "") == req.user._id || req.user.isAdmin){
      //Updates the song after request is verifed
      return Song.findByIdAndUpdate(req.params.id, {$set: editSong}, (err) => requestHandler.generic(res, err, "Updated", "message"));
    }

    //Unauthorized request
    return res.status(401).json({error: true, content: "Unauthorized"});
    
  });
}



exports.delete_song = (req, res) => {
  Song.findById(req.params.id, (err, song) => {
    if(err){

    }
    else if((song.poster + "") != req.user._id && !req.user.isAdmin){
      //Unauthorized request
      return res.status(401).json({error: true, content: "Unauthorized"});
    }
    
    //Delete song on authorization
    return Song.findByIdAndDelete(req.params.id, (err, song) => {
      if(err){
        //onError sends an error message
        return res.status(404).json({error: true, content: err});
      }
      else{
        //Deletes all reviews on a song
        Review.find({songID: song._id}, (err, reviews) => {
          if(!err && reviews != null && reviews != undefined){
            reviews.forEach((review) => review.remove());
          }
        });
  
        res.json({error: false, content: "Deleted"})
      }
    });
  })
}