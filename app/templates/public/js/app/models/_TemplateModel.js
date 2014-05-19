// TemplateModel.js
define([ 'jquery', 'backbone' ],
  function($, Backbone) {
    var TemplateModel = Backbone.Model.extend({
      url: 'api/templates',
      initialize: function() {
      },
      defaults: {
      },
      // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
      validate: function(attrs) {
      }
    });
    // Returns the Model class
    return TemplateModel;
  }
);
