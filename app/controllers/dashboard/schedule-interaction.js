import Ember from 'ember';
import ModelsNavigationMixin from 'phoenix/mixins/models-navigation';

export default Ember.ObjectController.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),

  navigableModels: Ember.computed.oneWay('dashboard.interactionsToSchedule'),
  modelRouteParams: ['dashboard.schedule-interaction'],

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    }
  },

  validations: {
    speakDialIn: {
      presence: true
    },
    from: {
      presence: true
    },
    majorTextArea: {
      presence: true
    }
  }
});
