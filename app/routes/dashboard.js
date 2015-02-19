import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      upcomingInteractions: this.store.find('interaction'),
      deliveryPerformance: this.store.find('deliveryPerformance', 'me')
    });
  }
});
