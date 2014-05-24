// DEPENDENCIES
// ============
var mongoose  = require('mongoose');

module.exports = User;

function User(db) {

  var Schema = new mongoose.Schema({
    name: String,
    password: String,
    _loggedIn: { type: Boolean, default: null }
  });

  Schema.statics.myFindAll = function(callback) {
    this.find(callback);
  };

  db.model('User', Schema);

};
