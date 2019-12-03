const User = require('../models/user.model');
const Song = require('../models/song.model');

//Imports a request handler
const requestHandler = require('../helpers/request.helper');

//Handles activating/deactivating a user
exports.toggle_user = (req, res) => {
  User.findByIdAndUpdate(req.params.id, {$set: {isActive: req.body.toggle}}, 
    (err, user) => {
      if(user == null || user == undefined){
        return res.status(404).json({error: true, content: 'User not found'});
      }
      else return requestHandler.generic(res, err, {user: user._id, active: req.body.toggle}, "content");
    }
  );
}

//Handles hiding/unhiding a song
exports.toggle_song = (req, res) => {
  Song.findByIdAndUpdate(req.params.id, {$set: {hidden: req.body.toggle}}, 
    (err, song) => {
      if(song == null || song == undefined){
        return res.status(404).json({error: true, content: 'Song not found'});
      }
      else return requestHandler.generic(res, err, {song: song._id, hidden: req.body.toggle}, "content")
    }
  );
}

//Handles making a user an admin or demoting an admin to a user
exports.toggle_admin = (req, res) => {
  User.findByIdAndUpdate(req.params.id, {$set: {isAdmin: req.body.toggle}}, 
    (err, user) => {
      if(user == null || user == undefined){
        return res.status(404).json({error: true, content: 'User not found'});
      }
      else return requestHandler.generic(res, err, {user: user._id, admin: req.body.toggle}, "content")
    }
  );
}

//isAdmin Controller returns back true if the admin can successfully pass the admin middleware
exports.check_admin = (req, res) => res.json({error: false, content: "Success"})