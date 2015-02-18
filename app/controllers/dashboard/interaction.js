import Ember from 'ember';
import ModelsNavigationMixin from 'phoenix/mixins/models-navigation';

export default Ember.ObjectController.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.alias('controllers.dashboard'),

  navigableModels: Ember.computed.alias('dashboard.upcomingInteractions.content'),
  modelRouteParams: ['dashboard.interaction'],

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    }
  }
});
