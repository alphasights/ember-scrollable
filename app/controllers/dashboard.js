import Ember from 'ember';
import TeamSwitcheableControllerMixin from 'phoenix/mixins/team-switcheable-controller';

export default Ember.Controller.extend(TeamSwitcheableControllerMixin, {
  teamMembers: Ember.computed.oneWay('model.teamMembers'),

  scheduledInteractions: Ember.computed('model.interactions.@each.hasIncompletePaymentSteps', function() {
    return this.get('model.interactions')
      .filterBy('scheduledCallTime')
      .filterBy('hasIncompletePaymentSteps', true)
      .sortBy('scheduledCallTime');
  }),

  interactionsToSchedule: Ember.computed('model.interactions.@each.used', function() {
    return this.get('model.interactions')
      .filterBy('used', false)
      .filter(function(interaction) {
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
