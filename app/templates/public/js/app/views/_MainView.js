// MainView.js
define([ 'jquery', 'backbone', 'models/UserModel', 'text!templates/Main.html' ],
  function($, Backbone, UserModel, template){
    var MainView = Backbone.View.extend({
      el: 'body',
      initialize: function() {
        this.model = new UserModel();
        this.model.on('change:_loggedIn', this.render, this);
        this.model.fetch();
      },
      events: {
        'click [data-login]': 'login',
        'click [data-logout]': 'logout'
      },
      render: function() {
        this.template = _.template(template, this.model.toJSON());
        this.$el.html(this.template);
        return this;
      },
      login: function() {
        this.model.save({
          username: $('#username').val(),
          password: $('#password').val()
        });
      },
      logout: function() {
        var self = this;
        this.model.destroy({
          success: function() { self.model.fetch(); },
          error: function() { self.model.fetch(); }
        });
      }
    });
    return MainView;
  }
);
