import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':projects'],
  tagName: 'article',

  contentSorting: ['index', 'createdAt:desc'],
  sortedContent: Ember.computed.sort('projects', 'contentSorting'),

  arrangedContent: Ember.computed('sortedContent.@each.priority', 'filterPriority', function() {
    return this.get('sortedContent').filterBy('priority', this.get('filterPriority'));
  }),

  actions: {
    reorderProjects: function(projects) {
      this.sendAction('reorderProjects', projects);
    }
  }
});
