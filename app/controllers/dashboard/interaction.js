import Ember from 'ember';
import ModelsNavigationMixin from 'phoenix/mixins/models-navigation';

export default Ember.ObjectController.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.alias('controllers.dashboard'),
  incompleteChecklistItems: Ember.computed.filterBy('checklistItems', 'completed', false),
  isChecklistComplete: Ember.computed.empty('incompleteChecklistItems'),
  navigableModels: Ember.computed.alias('dashboard.upcomingInteractions.arrangedContent'),
  modelRouteParams: ['dashboard.interaction'],

  checklistStatus: function() {
    if (this.get('isChecklistComplete')) {
      return 'Complete';
    }
    else {
      return 'Incomplete';
    }
  }.property('isChecklistComplete'),

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    }
  }
});
