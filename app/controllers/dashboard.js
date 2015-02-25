import Ember from 'ember';

export default Ember.ObjectController.extend({
  upcomingInteractions: Ember.computed.filterBy('interactions', 'scheduledCallTime')
});
