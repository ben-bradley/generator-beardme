// TemplateView.js
define([ 'jquery', 'backbone', 'collection/TemplatesCollection', 'text!templates/Template.html' ],
  function($, Backbone, TemplatesCollection, template){
    var TemplateView = Backbone.View.extend({
      el: '[data-role="main"]',
      initialize: function() {
        this.collection = new TemplatesCollection();
      },
      events: {
      },
      render: function() {
        this.template = _.template(template, {});
        this.$el.html(this.template);
        return this;
      }
    });
    return TemplateView;
  }
);
