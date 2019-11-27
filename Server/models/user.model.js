const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: {type: String},
  password: {type: String},
  firstName: {type: String},
  lastName: {type: String}
}, {collection: "Users"});

module.exports = mongoose.model('Song', UserSchema);