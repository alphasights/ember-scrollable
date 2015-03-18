import Ember from 'ember';
import ModelsNavigationMixin from 'phoenix/mixins/models-navigation';
import EmberValidations from 'ember-validations';
import PromiseController from 'phoenix/controllers/promise';
import { request } from 'ic-ajax';

export default Ember.ObjectController.extend(ModelsNavigationMixin, EmberValidations.Mixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),

  navigableModels: Ember.computed.oneWay('dashboard.interactionsToSchedule'),
  modelRouteParams: ['dashboard.schedule-interaction'],
  requestPromise: null,

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    },

    cancel: function() {
      var requestPromise = PromiseController.create({
        promise: request({
          url: `${EmberENV.apiBaseUrl}/interests/${this.get('model.id')}`,
          type: 'DELETE'
        }).then(response => {
          this.store.pushPayload(response);
          this.send('hideSidePanel');
        })
      });

      this.set('requestPromise', requestPromise);
    }
  },

  validations: {
    speakDialIn: {
      presence: true,
      numericality: true
    },
    interactionType: {
      presence: true
    }
  },

  interactionTypes: [
    { id: 1, name: 'Interaction type 1' },
    { id: 2, name: 'Interaction type 2' },
    { id: 3, name: 'Interaction type 3' }
  ]
});
