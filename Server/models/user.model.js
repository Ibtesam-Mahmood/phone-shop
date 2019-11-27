const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: {type: String},
  password: {type: String},
  firstName: {type: String},
  lastName: {type: String},
  isAdmin: {type: Boolean},
  isActive: {type: Boolean}
}, {collection: "Users"});

module.exports = mongoose.model('Song', UserSchema);