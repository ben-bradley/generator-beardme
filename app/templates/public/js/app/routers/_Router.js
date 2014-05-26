// Router.js
define([ 'jquery', 'backbone', 'views/MainView' ],
  function($, Backbone, MainView) {
    // fire up the router
    var Router = Backbone.Router.extend({
      initialize: function() {
        Backbone.history.start(); // Tells Backbone to start watching for hashchange events
      },
      // All of your Backbone Routes (add more)
      routes: {
        '': 'mainView' // When there is no hash on the url, the home method is called
      },
      mainView: function() {
        new MainView(); // Instantiates a new view which will render the header text to the page
      }
    });
    // Returns the Router
    return Router;
  }
);
