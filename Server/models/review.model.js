const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  songID: {type: Schema.Types.ObjectId, required: true},
  userID: {type: Schema.Types.ObjectId, required: true},
  content: {type: String, maxlength: 500},
  rating: {type: Number, min: 1, max: 5, required: true},
  date: {type: Date, required: true}
}, {collection: "Reviews"});

module.exports = mongoose.model('Review', ReviewSchema);