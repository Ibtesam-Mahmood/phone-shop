const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
  name: {type: String, required: true},
  album: {type: String},
  artist: {type: String},
  img: {type: String},
  releaseDate: {type: Date}
}, {collection: "Songs"});

module.exports = mongoose.model('Song', SongSchema);