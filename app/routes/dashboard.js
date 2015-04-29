import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    teamId: {
      refreshModel: true
    }
  },

  model: function(params) {
    return Ember.RSVP.hash({
      teams: this.modelFor('application').teams,
      interactions: this.store.find('interaction', { team_id: params.teamId }),
      deliveryPerformance: this.store.find('deliveryPerformance', 'me')
    });
  }
});
