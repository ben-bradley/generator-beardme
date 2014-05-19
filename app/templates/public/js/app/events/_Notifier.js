define([ 'jquery', 'backbone' ],
  function($, Backbone) {
    var Notifier = _.extend({}, Backbone.Events);
    return Notifier;
  }
);
