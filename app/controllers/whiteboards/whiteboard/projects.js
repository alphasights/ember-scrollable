import Ember from 'ember';

export default Ember.ArrayController.extend({
  whiteboard: null,
  filterPriority: Ember.computed.oneWay('whiteboard.filterPriority'),

  sortedContent: Ember.computed('content.[]', function() {
    return this.get('content').sortBy('index', 'createdAt');
  }),

  arrangedContent: Ember.computed('sortedContent.[]', 'filterPriority', function() {
    return this.get('sortedContent').filterBy('priority', this.get('filterPriority'));
  })
});
