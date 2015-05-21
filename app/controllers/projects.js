import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: {
    filterPriority: 'priority'
  },

  filterPriority: 'high',

  actions: {
    showProject: function(project) {
      window.open(project.get('pistachioUrl'), '_blank');
    },
  }
});
