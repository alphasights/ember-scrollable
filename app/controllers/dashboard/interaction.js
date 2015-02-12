import Ember from 'ember';

export default Ember.ObjectController.extend({
  incompleteChecklistItems: Ember.computed.filterBy('checklistItems', 'completed', false),
  isChecklistComplete: Ember.computed.empty('incompleteChecklistItems'),

  checklistStatus: function() {
    if (this.get('isChecklistComplete')) {
      return 'Complete';
    }
    else {
      return 'Incomplete';
    }
  }.property('isChecklistComplete')
});
