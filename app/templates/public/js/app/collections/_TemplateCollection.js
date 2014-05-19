// TemplateCollection.js
define([ 'jquery', 'backbone', 'models/TemplateModel' ],
  function($, Backbone, Model) {
    // Creates a new Backbone Collection class object
    var TemplateCollection = Backbone.Collection.extend({
      // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
      model: Model
    });
    // Returns the Model class
    return TemplateCollection;
  }
);
