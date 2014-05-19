// UserModel.js
define([ 'jquery', 'backbone' ],
  function($, Backbone) {
    var UserModel = Backbone.Model.extend({
      url: 'api/user',
      initialize: function() {
      },
      defaults: {
        _loggedIn: null
      },
      // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
      validate: function(attrs) {
      }
    });
    // Returns the Model class
    return UserModel;
  }
);
