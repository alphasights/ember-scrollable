import Ember from 'ember';

export default Ember.ObjectController.extend({
  upcomingInteractions: function() {
    return this.get('interactions')
      .filterBy('scheduledCallTime')
      .sortBy('scheduledCallTime');
  }.property('interactions.@each.scheduledCallTime'),

  interactionsToSchedule: function() {
    return this.get('interactions').filter(function(interaction) {
      return interaction.get('requestedAt') != null &&
        interaction.get('scheduledCallTime') == null;
    }).sort(function(a, b) {
      return -Ember.compare(a.get('requestedAt'), b.get('requestedAt'));
    });
  }.property('interactions.@each.{scheduledCallTime,requestedAt}')
});
