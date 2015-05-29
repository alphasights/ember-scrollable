import Ember from 'ember';
import TeamSwitcheableControllerMixin from 'phoenix/mixins/team-switcheable-controller';

export default Ember.Controller.extend(TeamSwitcheableControllerMixin, {
  teamMembers: Ember.computed.oneWay('model.teamMembers'),

  upcomingInteractions: Ember.computed('model.interactions.[]', function() {
    return this.get('model.interactions')
      .filterBy('scheduledCallTime')
      .sortBy('scheduledCallTime');
  }),

  interactionsToSchedule: Ember.computed('model.interactions.[]', function() {
    return this.get('model.interactions').filter(function(interaction) {
      return interaction.get('requestedAt') != null &&
        interaction.get('scheduledCallTime') == null &&
        !interaction.get('actioned');
    }).sort(function(a, b) {
      return -Ember.compare(a.get('requestedAt'), b.get('requestedAt'));
    });
  }),

  unusedAdvisors: Ember.computed('model.unusedAdvisors.[]', function() {
    return this.get('model.unusedAdvisors').sortBy('termsSentAt');
  })
});
