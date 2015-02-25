import Ember from 'ember';
import ModelsNavigationMixin from 'phoenix/mixins/models-navigation';

export default Ember.ObjectController.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),

  navigableModels: Ember.computed.oneWay('dashboard.upcomingInteractions'),
  modelRouteParams: ['dashboard.interaction'],

  profiles: function() {
    return [{
      person: this.get('advisor'),
      class: 'advisor',
      title: 'Advisor'
    }, {
      person: this.get('clientContact'),
      class: 'client',
      title: 'Client'
    }];
  }.property('advisor', 'clientContact'),

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    }
  }
});
