import Ember from 'ember';

export default Ember.Controller.extend({
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
  })
});
