import Ember from 'ember';
import TeamSwitcheableControllerMixin from 'phoenix/mixins/team-switcheable-controller';

export default Ember.Controller.extend(TeamSwitcheableControllerMixin, {
  queryParams: {
    filterPriority: 'priority'
  },

  filterPriority: 'high',
  newProjectUrl: `${EmberENV.pistachioUrl}/projects/new`,

  actions: {
    showProject: function(project) {
      window.open(project.get('pistachioUrl'), '_blank');
    },
  }
});
