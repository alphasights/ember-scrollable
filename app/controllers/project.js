import Ember from 'ember';

export default Ember.ObjectController.extend({
  progress: function() {
    return Math.random();
  }.property()
});
