import Ember from 'ember';
import ModelsNavigationMixin from 'phoenix/mixins/models-navigation';

export default Ember.ObjectController.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),

  navigableModels: Ember.computed.oneWay('dashboard.interactionsToSchedule'),
  modelRouteParams: ['dashboard.schedule-interaction'],

  occurrences: function() {
    if (this.get('scheduledCallTime') != null) {
      return [Ember.Object.create({
        type: 'interaction',
        time: moment(this.get('scheduledCallTime')),
        title: 'Scheduled Call',
        duration: moment.duration(60, 'minute')
      })];
    } else {
      return [];
    }
  }.property('scheduledCallTime'),

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    }
  }
});
