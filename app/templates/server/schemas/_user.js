// DEPENDENCIES
// ============
var mongoose  = require('mongoose');

module.exports = User;

function User(app) {

  var Schema = new mongoose.Schema({
    name: String,
    password: String,
    _loggedIn: { type: Boolean, default: null }
  });

  Schema.statics.myFindAll = function(callback) {
    this.find(callback);
  };

  app.db.model('User', Schema);

};
