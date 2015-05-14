import Ember from 'ember';
import TeamDeliveryPerformance from 'phoenix/models/team-delivery-performance';

export default Ember.Route.extend({
  queryParams: {
    teamId: {
      refreshModel: true
    }
  },

  model: function(params) {
    var interactions, teamMembers, deliveryPerformance;
    var currentUser = this.controllerFor('currentUser').get('model');
    var teamId = params.teamId;

    if (teamId != null) {
      interactions = this.store.find('interaction', { team_id: teamId });
      teamMembers = this.store.find('user', { team_id: teamId });

      deliveryPerformance = this.store.find('deliveryPerformance', { team_id: teamId }).then(function(deliveryPerformances) {
        return TeamDeliveryPerformance.create({ userPerformances: deliveryPerformances.toArray() });
      });
    } else {
      interactions = this.store.find(
        'interaction', { primary_contact_id: currentUser.get('model.id') }
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
      deliveryPerformance: deliveryPerformance,
      unusedAdvisors: this.store.find('unusedAdvisor')
    });
  }
});
