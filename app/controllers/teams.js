import Ember from 'ember';

export default Ember.ArrayController.extend({
  arrangedContent: (function() {
    return this.get('model').sortBy('office');
  }).property('model')
});
