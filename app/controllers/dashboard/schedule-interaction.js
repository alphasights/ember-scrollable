import Ember from 'ember';
import ModelsNavigationMixin from 'phoenix/mixins/models-navigation';

export default Ember.ObjectController.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),

  navigableModels: Ember.computed.oneWay('dashboard.interactionsToSchedule'),
  modelRouteParams: ['dashboard.schedule-interaction'],

  unavailabilities: [
    Ember.Object.create({
      type: 'alpha-call',
      time: moment().startOf('week').add(10, 'hour'),
      duration: moment.duration(5, 'hour')
    }),

    Ember.Object.create({
      type: 'alpha-call',
      time: moment().startOf('week').add(8, 'hour').add(3, 'day'),
      duration: moment.duration(2, 'hour')
    })
  ],

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    }
  }
});
