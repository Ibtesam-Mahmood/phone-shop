const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  songID: {type: Schema.Types.ObjectId},
  userID: {type: Schema.Types.ObjectId},
  content: {type: String, maxlength: 500},
  rating: {type: Number, min: 1, max: 5}
}, {collection: "Reviews"});

module.exports = mongoose.model('Review', ReviewSchema);