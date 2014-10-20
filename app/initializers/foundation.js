import Ember from 'ember';

export default {
  name: 'foundation',

  initialize: function() {
    Ember.View.reopen({
      onDidInsertElement: function() {
        Ember.run.scheduleOnce('afterRender', this, this.initializeFoundation);
      }.on('didInsertElement'),

      initializeFoundation: function() {
        Ember.$(document).foundation();
      }
    });
  }
};
