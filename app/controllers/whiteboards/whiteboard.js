import Ember from 'ember';
import { request } from 'ic-ajax';

export default Ember.Controller.extend({
  queryParams: {
    filterPriority: 'priority'
  },

  filterPriority: 'high',

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
