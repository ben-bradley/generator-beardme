// MainView.js
define([ 'jquery', 'backbone', 'socketio', 'models/UserModel', 'text!templates/Main.html' ],
  function($, Backbone, io, UserModel, template){
    var MainView = Backbone.View.extend({
      el: 'body',
      initialize: function() {
        this.model = new UserModel();
        this.model.on('change:_loggedIn', this.render, this);
        this.model.fetch();
        this.getBeardCount();
        this.handleIo();
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
      },
      getBeardCount: function() {
        var self = this;
        $.getJSON('api/jsonp/https://api.npmjs.org/downloads/point/last-week/generator-beardme', function(json) {
          self.$('#beardCount').removeClass().html(json.downloads);
        });
      },
      handleIo: function() {
        var self = this;
        this.io = io.connect('/');
        this.io.on('time', function(time) {
          self.$('#time').removeClass().html(new Date(time).toLocaleTimeString());
        });
      }
    });
    return MainView;
  }
);
