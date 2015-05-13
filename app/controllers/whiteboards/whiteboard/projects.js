import Ember from 'ember';

export default Ember.ArrayController.extend({
  whiteboard: null,
  filterPriority: Ember.computed.oneWay('whiteboard.filterPriority'),
  contentSorting: ['index', 'createdAt:desc'],
  sortedContent: Ember.computed.sort('content', 'contentSorting'),

  arrangedContent: Ember.computed('sortedContent.@each.priority', 'filterPriority', function() {
    return this.get('sortedContent').filterBy('priority', this.get('filterPriority'));
  })
});
