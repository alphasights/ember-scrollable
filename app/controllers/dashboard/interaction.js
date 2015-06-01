import Ember from 'ember';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';
import notify from 'phoenix/helpers/notify';
import InteractionCancellation from 'phoenix/services/interaction-cancellation';

export default Ember.Controller.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),
  navigableModels: Ember.computed.oneWay('dashboard.scheduledInteractions'),
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

  _cancel: function(withdrawFromCompliance = false) {
    var requestPromise =
      InteractionCancellation.create().cancel(this.get('model'), response => {
        this.store.pushPayload(response);
        this.get('dashboard').propertyDidChange('scheduledInteractions');
        notify('The interaction has been cancelled.');
        this.get('sidePanel').send('close');
      }, withdrawFromCompliance);

    this.set('requestPromise', requestPromise);
  },

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    },

    cancel: function() {
      this._cancel(false);
    },

    withdrawAndCancel: function() {
      this._cancel(true);
    },

    reschedule: function() {
      this.transitionToRoute('dashboard.schedule-interaction', this.get('model.id'));
    }
  }
});
