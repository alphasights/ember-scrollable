import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':projects'],
  tagName: 'article',

  readOnly: false,
  contentSorting: ['index', 'createdAt:desc'],
  sortedContent: Ember.computed.sort('projects', 'contentSorting'),

  arrangedContent: Ember.computed('sortedContent.@each.priority', 'filterPriority', function() {
    return this.get('sortedContent').filterBy('priority', this.get('filterPriority'));
  }),

  _onArrangedContentChange: Ember.observer('arrangedContent.[]', function() {
    Ember.run.debounce(this, 'sendArrangedContent', 0);
  }).on('init'),

  sendArrangedContent: function() {
    this.sendAction('onArrangedContentChange', this.get('arrangedContent'));
  },

  actions: {
    reorderProjects: function(projects) {
      this.sendAction('reorderProjects', projects);
    },

    showProject: function(project) {
      this.sendAction('showProject', project);
    }
  }
});
