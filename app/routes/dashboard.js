import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    teamId: {
      refreshModel: true
    }
  },

  model: function(params) {
    var interactions, teamMembers;
    var teamId = params.teamId;

    if (teamId != null) {
      interactions = this.store.find('interaction', { team_id: teamId });
      teamMembers = this.store.find('user', { team_id: params.teamId });
    } else {
      interactions = this.store.find('interaction');
      teamMembers = null;
    }

    return Ember.RSVP.hash({
      interactions: interactions,
      teamMembers: teamMembers,

      deliveryPerformance: this.store.find('deliveryPerformance', 'me').then((value) => {
        this.store.recordForId('deliveryPerformance', 'me').unloadRecord();
        return value;
      })
    });
  }
});
