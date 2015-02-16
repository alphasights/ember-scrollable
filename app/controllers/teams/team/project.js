import Ember from 'ember';
import ProjectProgressMixin from 'phoenix/mixins/project-progress';
import ModelsNavigationMixin from 'phoenix/mixins/models-navigation';

export default Ember.ObjectController.extend(ProjectProgressMixin, ModelsNavigationMixin, {
  needs: ['teams/team'],
  team: Ember.computed.alias('controllers.teams/team'),
  anglesSorting: ['createdAt:desc'],
  angles: Ember.computed.sort('model.angles', 'anglesSorting'),
  navigableModels: Ember.computed.alias('team.projects.arrangedContent'),

  modelRouteParams: function () {
    return ['teams.team.project', this.get('team.model.id')];
  }.property('team.model.id'),

  pistachioUrl: function() {
    return `${EmberENV.pistachioUrl}/projects/${this.get('id')}`;
  }.property('id'),

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('teams.team', this.get('team.id'));
    }
  }
});
