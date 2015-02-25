import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      interactions: this.store.find('interaction')
    });
  }
});
