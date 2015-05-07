import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    teamId: {
      refreshModel: true
    }
  },

  model: function(params) {
    var interactions, teamMembers, deliveryPerformance;
    var currentUser = this.controllerFor('currentUser');
    var teamId = params.teamId;

    if (teamId != null) {
      interactions = this.store.find('interaction', { team_id: teamId });
      teamMembers = this.store.find('user', { team_id: teamId });
      deliveryPerformance = this.store.find('deliveryPerformance', { team_id: teamId });
    } else {
      interactions = this.store.find(
        'interaction', { primary_contact_id: currentUser.get('id') }
      );

      deliveryPerformance = this.store.find('deliveryPerformance', 'me').then((value) => {
        this.store.recordForId('deliveryPerformance', 'me').unloadRecord();
        return value;
      });

      teamMembers = null;
    }

    return Ember.RSVP.hash({
      interactions: interactions,
      teamMembers: teamMembers,

      deliveryPerformance: deliveryPerformance
    });
  }
});
