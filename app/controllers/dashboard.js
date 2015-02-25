import Ember from 'ember';

export default Ember.ObjectController.extend({
  upcomingInteractions: function() {
    return this.get('interactions')
      .filterBy('scheduledCallTime')
      .sortBy('scheduledCallTime');
  }.property('interactions.@each.scheduledCallTime')
});
