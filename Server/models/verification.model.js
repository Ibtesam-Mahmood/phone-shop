const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Used to verify a user
let VerificationSchema = new Schema({
  email: {type: String, required: true},
  user: {type: Object, required: true},
  expire_at: {type: Date, default: Date.now, expires: 600}
}, {collection: "Verification"});



module.exports = mongoose.model('Verification', VerificationSchema);