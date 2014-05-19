// DEPENDENCIES
// ============
var mongoose  = require('mongoose');

module.exports = User;

function User(db) {

  this.name = 'User';

  this.schema = new mongoose.Schema({
    name: String,
    password: String,
    _loggedIn: { type: Boolean, default: null }
  });

  this.model = db.model('User', this.schema);

  return this;
};

User.prototype.myfindall = function(callback) {
  this.model.find({}, callback);
}
