import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    teamId: {
      refreshModel: true
    }
  },

  model: function(params) {
    var interactions;

    if (params.teamId != null) {
      interactions = this.store.find('interaction', { team_id: params.teamId });
    } else {
      interactions = this.store.find('interaction');
    }

    return Ember.RSVP.hash({
      interactions: interactions,

      deliveryPerformance: this.store.find('deliveryPerformance', 'me').then((value) => {
        this.store.recordForId('deliveryPerformance', 'me').unloadRecord();
        return value;
      })
    });
  }
});
