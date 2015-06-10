import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':projects'],
  tagName: 'article',

  teamMembers: null,
  contentSorting: ['index', 'createdAt:desc'],
  listItemComponent: null,
  draggable: false,
  selectedTeamMember: null,

  filteredContent: Ember.computed('projects.[]', 'selectedTeamMember', function() {
    var selectedTeamMember = this.get('selectedTeamMember');
    var projects = this.get('projects');

    if (selectedTeamMember != null) {
      return projects.filter((project) => {
        return project.get('lead') === selectedTeamMember || project.get('members').indexOf(selectedTeamMember) > 0;
      });
    } else {
      return projects;
    }
  }),

  sortedContent: Ember.computed.sort('filteredContent', 'contentSorting'),

  arrangedContent: Ember.computed('sortedContent.@each.priority', 'filterPriority', function() {
    return this.get('sortedContent').filterBy('priority', this.get('filterPriority'));
  }),

  _onArrangedContentChange: Ember.observer('arrangedContent.[]', function() {
    this.sendAction('onArrangedContentChange', this.get('arrangedContent'));
  }).on('init'),

  actions: {
    reorderProjects: function(projects) {
      this.sendAction('reorderProjects', projects);
    },

    onProjectClick: function(project) {
      this.sendAction('onProjectClick', project);
    }
  }
});
