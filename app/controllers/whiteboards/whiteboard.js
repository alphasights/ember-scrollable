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
      this.get('projects.sortedContent').setObjects(projects);

      analytics.track('Reordered Projects');

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
