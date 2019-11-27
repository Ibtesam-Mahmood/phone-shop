
const Song = require('../models/song.model');
const mongoose = require('mongoose');

//Imports a request handler
const requestHandler = require('../helpers/request.helper');

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

exports.get_song = (req, res) => {
  Song.findById(req.params.id, (err, song) => requestHandler.generic(res, err, song, "song"));
}

//Handles getting all songs
exports.get_all_songs = (req, res) => {
  Song.find({}, (err, songs) => requestHandler.generic(res, err, songs, "songs"));
}

exports.edit_song = (req, res) => {
  Song.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, song) => requestHandler.generic(res, err, "Updated", "message"));
}

exports.delete_song = (req, res) => {
  Song.findByIdAndDelete(req.params.id, (err, song) => requestHandler.generic(res, err, "Deleted", "message"));
}