import Ember from 'ember';
import { request } from 'ic-ajax';

export default Ember.Controller.extend({
  queryParams: {
    filterPriority: 'priority'
  },

  filterPriority: 'high',
  arrangedProjects: null,

  actions: {
    reorderProjects: function(projects) {
      analytics.track('Reordered Projects');

      projects.forEach(function(project, index) {
        project.set('index', index);
      });

      request(`${EmberENV.apiBaseUrl}/projects/indexes`, {
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',

        data: JSON.stringify({
          projects: projects.map(function(project, index) {
            return {
              id: project.get('id'),
              index: index
            };
          })
        })
      });
    },

    showProject: function(project) {
      this.transitionToRoute('whiteboards.whiteboard.project', this.get('model.id'), project.get('id'));
    },

    onProjectsChange: function(projects) {
      this.set('arrangedProjects', projects);
    }
  }
});
