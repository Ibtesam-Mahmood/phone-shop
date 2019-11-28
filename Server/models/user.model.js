const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String},
  isAdmin: {type: Boolean},
  isActive: {type: Boolean}
}, {collection: "Users"});

module.exports = mongoose.model('User', UserSchema);