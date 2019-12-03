
const Song = require('../models/song.model');
const Review = require('../models/review.model');
var sanitizer = require('sanitize')();

//Imports a request handler
const requestHandler = require('../helpers/request.helper');

//Handles adding a song to the database
exports.add_song = (req, res) => {

  //New song defined by the body of the request
  let newSong = new Song({
    name: sanitizer.value(req.body.name, 'string'),
    poster: req.user._id, //Pulls the poster id from the user logged in
    album: sanitizer.value(req.body.album, 'string'),
    artist: sanitizer.value(req.body.artist, 'string'),
    img: sanitizer.value(req.body.img, 'string'),
    releaseDate: req.body.releaseDate,
    hidden: false
  });
  //Attempts to add the song to the database
  newSong.save((err, song) => requestHandler.generic(res, err, song, "song"));
}

//Handles finding song by id
exports.get_songs_by_user = (req, res) => {
  Song.find({poster: req.params.id}, async (err, songs) => requestHandler.generic(res, err, songs, "Songs"));
}

//Handles finding song by id
exports.get_song = (req, res) => {
  Song.findById(req.params.id, async (err, song) => requestHandler.generic(res, err, song, "Song"));
}

//Handles getting all songs
exports.get_all_songs = (req, res) => {

  //The params for the query
  let queryParams = {};
  if(req.query.hidden != null || req.query.hidden != undefined ){
    //Only gets non hidden songs
    queryParams.hidden = req.query.hidden;
  }

  if(req.query.length != null || req.query.length != undefined){
    //Length limit
    return Song.find(queryParams).limit(parseInt(req.query.length)).exec(async (err, songs) => requestHandler.generic(res, err, songs, "Songs"));
  }
  else{
    //No length limit
    return Song.find(queryParams).exec(async (err, songs) => requestHandler.generic(res, err, songs, "Songs"));
  }
  
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