import Ember from 'ember';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';
import InteractionCompletion from 'phoenix/models/interaction-completion';
import PromiseController from 'phoenix/controllers/promise';
import notify from 'phoenix/helpers/notify';
import InteractionCancellation from 'phoenix/services/interaction-cancellation';

var qualityOptionsMapping = {
  'good': 'Good',
  'bad': 'Bad'
};

export default Ember.Controller.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),
  navigableModels: Ember.computed.oneWay('dashboard.scheduledInteractions'),
  modelRouteParams: ['dashboard.interaction'],

  showForm: false,
  requestPromise: null,

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

  qualityOptions: Ember.computed(function() {
    return InteractionCompletion.qualityOptions.map(function(option) {
      return Ember.Object.create({
        id: option,
        name: qualityOptionsMapping[option]
      });
    });
  }),

  _cancel: function(withdrawFromCompliance = false) {
    var requestPromise =
      InteractionCancellation.create().cancel(this.get('model'), response => {
        notify('The interaction has been cancelled.');
        this.store.pushPayload(response);
        this.get('dashboard').propertyDidChange('scheduledInteractions');
        this.get('sidePanel').send('close');
      }, withdrawFromCompliance);

    this.set('requestPromise', requestPromise);
  },

  actions: {
    chargeClient: function() {
      this.set('requestPromise', PromiseController.create({
        promise: this.get('completion').save().then(() => {
          notify('The interaction has been completed.');
          this.get('sidePanel').send('close');
        }).catch(function() {
          notify('There has been an error completing the interaction.', 'error');
        })
      }));
    },

    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    },

    toggleForm: function() {
      this.toggleProperty('showForm');
    },

    cancel: function() {
      this._cancel(false);
    },

    withdrawAndCancel: function() {
      this._cancel(true);
    },

    reschedule: function() {
      var model = this.get('model');

      model.set('scheduledCallTime', null);

      this.set('requestPromise', PromiseController.create({
        promise: model.save().then(
          this.get('dashboard').propertyDidChange('scheduledInteractions'),
          this.get('dashboard').propertyDidChange('interactionsToSchedule'),
          this.transitionToRoute('dashboard.schedule-interaction', this.get('model.id'))
        )
      }));
    }
  }
});
