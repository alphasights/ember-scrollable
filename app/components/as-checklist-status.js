import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':checklist-status', 'isComplete:complete'],

  items: null,
  incompleteItems: Ember.computed.filterBy('items', 'completed', false),
  isComplete: Ember.computed.empty('incompleteItems'),
  showTooltip: false,

  title: Ember.computed('showTooltip', 'status', function() {
    if (this.get('showTooltip')) {
      return `Checklist ${this.get('status')}`;
    } else {
      return null;
    }
  }),

  status: Ember.computed('isComplete', function() {
    if (this.get('isComplete')) {
      return 'Complete';
    } else {
      return 'Incomplete';
    }
  }),
});
