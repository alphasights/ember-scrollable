import Ember from 'ember';
import TeamDeliveryPerformance from 'phoenix/models/team-delivery-performance';
import TeamSwitcheableRouteMixin from 'phoenix/mixins/team-switcheable-route';

export default Ember.Route.extend(TeamSwitcheableRouteMixin, {
  currentUser: Ember.inject.service(),
  titleToken: 'Dashboard',

  model: function(params) {
    var interactions, teamMembers, deliveryPerformance;
    var teamId = params.teamId;
    var whiteboardId = params.whiteboardId;

    if (teamId != null || whiteboardId != null) {
      var queryParams = Ember.isPresent(teamId) ? { team_id: teamId } : { whiteboard_id: whiteboardId };
      interactions = this.store.find('interaction', queryParams);
      teamMembers = this.store.find('user', queryParams);

      deliveryPerformance = this.store.find('deliveryPerformance', queryParams).then(function(deliveryPerformances) {
        return TeamDeliveryPerformance.create({ userPerformances: deliveryPerformances.toArray() });
      });
    } else {
      interactions = this.store.find(
        'interaction', { primary_contact_id: this.get('currentUser.id') }
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
