import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':checklist-status', 'isComplete:complete'],

  items: null,
  incompleteItems: Ember.computed.filterBy('items', 'completed', false),
  isComplete: Ember.computed.empty('incompleteItems'),

  status: function() {
    if (this.get('isComplete')) {
      return 'Complete';
    } else {
      return 'Incomplete';
    }
  }.property('isComplete'),
});
