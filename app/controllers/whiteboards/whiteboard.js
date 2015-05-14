import Ember from 'ember';
import ProjectsController from './whiteboard/projects';
import { request } from 'ic-ajax';

export default Ember.ObjectController.extend({
  queryParams: {
    filterPriority: 'priority'
  },

  filterPriority: 'high',

  init: function() {
    this._super.apply(this, arguments);
    this.set('projects', ProjectsController.create({ whiteboard: this }));
  },

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
    }
  }
});
