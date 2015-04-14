import Ember from 'ember';

export default Ember.ObjectController.extend({
  upcomingInteractions: Ember.computed('interactions.[]', function() {
    return this.get('interactions')
      .filterBy('scheduledCallTime')
      .sortBy('scheduledCallTime');
  }),

  interactionsToSchedule: Ember.computed('interactions.[]', function() {
    return this.get('interactions').filter(function(interaction) {
      return interaction.get('requestedAt') != null &&
        interaction.get('scheduledCallTime') == null &&
        !interaction.get('actioned');
    }).sort(function(a, b) {
      return -Ember.compare(a.get('requestedAt'), b.get('requestedAt'));
    });
  })
});
