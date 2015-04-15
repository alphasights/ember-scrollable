import Ember from 'ember';
import ProjectProgressMixin from 'phoenix/mixins/project-progress';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';

export default Ember.ObjectController.extend(ProjectProgressMixin, ModelsNavigationMixin, {
  needs: ['teams/team'],
  team: Ember.computed.oneWay('controllers.teams/team'),

  navigableModels: Ember.computed.oneWay('team.projects.arrangedContent'),

  modelRouteParams: Ember.computed('team.id', function () {
    return ['teams.team.project', this.get('team.id')];
  }),

  anglesSorting: ['createdAt:desc'],
  angles: Ember.computed.sort('model.angles', 'anglesSorting'),

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('teams.team', this.get('team.id'));
    }
  }
});
