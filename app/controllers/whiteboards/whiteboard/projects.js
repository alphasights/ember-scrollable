import Ember from 'ember';

export default Ember.ArrayController.extend({
  whiteboard: null,
  filterPriority: Ember.computed.oneWay('whiteboard.filterPriority'),

  arrangedContent: Ember.computed('content.@each.priority', 'filterPriority', function() {
    return this.get('content').filterBy('priority', this.get('filterPriority'));
  })
});
