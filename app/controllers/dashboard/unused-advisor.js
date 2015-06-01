import Ember from 'ember';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';

export default Ember.Controller.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),

  navigableModels: Ember.computed.oneWay('dashboard.unusedAdvisors'),
  modelRouteParams: ['dashboard.unused-advisor'],

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    }
  }
});
