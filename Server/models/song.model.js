const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
  name: {type: String, required: true},
  album: {type: String},
  artist: {type: String},
  img: {type: String},
  rating: {type: Number, min: 1, max: 5}
}, {collection: "Songs"});

module.exports = mongoose.model('Song', SongSchema);