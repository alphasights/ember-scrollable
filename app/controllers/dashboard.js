import Ember from 'ember';

export default Ember.ObjectController.extend({
  upcomingInteractions: function() {
    return this.get('interactions')
      .filterBy('scheduledCallTime')
      .sortBy('scheduledCallTime');
  }.property('interactions.@each.scheduledCallTime'),

  interactionsToSchedule: function() {
    return this.get('interactions').filter(function(interaction) {
      return Ember.isPresent(interaction.get('requestedAt')) &&
        Ember.isBlank(interaction.get('scheduledCallTime'))
    })
  }.property('interactions.@each.{scheduledCallTime,requestedAt}')
});
