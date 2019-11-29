const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
  name: {type: String, required: true},
  poster: {type: Schema.Types.ObjectId, required: true}, //The user that posts the song
  album: {type: String},
  artist: {type: String},
  img: {type: String},
  releaseDate: {type: Date},
  hidden: {type: Boolean, required: true}
}, {collection: "Songs"});

module.exports = mongoose.model('Song', SongSchema);