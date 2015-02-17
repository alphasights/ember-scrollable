import Ember from 'ember';
import ModelsNavigationMixin from 'phoenix/mixins/models-navigation';

export default Ember.ObjectController.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.alias('controllers.dashboard'),

  navigableModels: Ember.computed.alias('dashboard.upcomingInteractions.content'),
  modelRouteParams: ['dashboard.interaction'],

  pistachioUrl: function() {
    return `${EmberENV.pistachioUrl}/interactions/${this.get('id')}`;
  }.property('id'),

  checklistUrl: function() {
    return `${EmberENV.pistachioUrl}/projects/${this.get('project.id')}/proposal#checklist_${this.get('id')}`;
  }.property('id', 'project.id'),

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    }
  }
});
