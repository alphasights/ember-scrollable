import Ember from 'ember';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';
import notify from 'phoenix/helpers/notify';

export default Ember.Controller.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),
  interactionCancellation: Ember.inject.service(),

  navigableModels: Ember.computed.oneWay('dashboard.upcomingInteractions'),
  modelRouteParams: ['dashboard.interaction'],

  profiles: Ember.computed('model.advisor', 'model.clientContact', function() {
    return [{
      person: this.get('model.advisor'),
      class: 'advisor',
      title: 'Advisor'
    }, {
      person: this.get('model.clientContact'),
      class: 'client',
      title: 'Client'
    }];
  }),

  checklistItems: Ember.computed.sort('model.checklistItems', 'checklistItemsSorting'),
  checklistItemsSorting: ['completed', 'createdAt'],

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    },

    cancel: function() {
      var requestPromise =
        this.get('interactionCancellation').cancel(this.get('model'), response => {
          this.store.pushPayload(response);
          this.get('dashboard').propertyDidChange('upcomingInteractions');
          notify('The interaction has been cancelled.');
          this.get('sidePanel').send('close');
        });

      this.set('requestPromise', requestPromise);
    }
  }
});
