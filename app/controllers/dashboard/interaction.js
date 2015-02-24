import Ember from 'ember';
import ModelsNavigationMixin from 'phoenix/mixins/models-navigation';

export default Ember.ObjectController.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),

  navigableModels: Ember.computed.oneWay('dashboard.upcomingInteractions'),
  modelRouteParams: ['dashboard.interaction'],

  profiles: function() {
    var advisor = this.get('advisor');
    var clientContact = this.get('clientContact');

    return [{
      person: advisor,
      id: 'advisor',
      title: 'Advisor',
      callTime: this.localCallTime(advisor),
    }, {
      person: clientContact,
      id: 'client',
      title: 'Client',
      callTime: this.localCallTime(clientContact)
    }];
  }.property('advisor', 'clientContact', 'scheduledCallTime'),

  localCallTime: function(person) {
    return moment
      .tz(this.get('scheduledCallTime'), person.get('timeZone'))
      .format('h:mm A z');
  },

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    }
  }
});
