import Ember from 'ember';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';
import PromiseController from 'phoenix/controllers/promise';
import notify from 'phoenix/helpers/notify';
import InteractionCancellation from 'phoenix/services/interaction-cancellation';

export default Ember.Controller.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),
  navigableModels: Ember.computed.oneWay('dashboard.scheduledInteractions'),
  modelRouteParams: ['dashboard.interaction'],

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

  schedulingTabUrl: Ember.computed('model.project', function() {
    let projectId = this.get('model.project.id');
    let interactionId = this.get('model.id');

    return `${EmberENV.pistachioUrl}/projects/${projectId}/proposal#advisorship_${interactionId}`;
  }),

  invoiceUrl: Ember.computed('model.advisor', function() {
    let advisorId = this.get('model.advisor.id');

    return `${EmberENV.pistachioUrl}/invoices/new?advisor_id=${advisorId}`;
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
      this.get('completionForm').save().then(() => {
        notify('The interaction has been completed.');
        this.get('sidePanel').send('close');
      });
    },

    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    },

    toggleDrawer: function() {
      this.get('sidePanel').send('toggleDrawer');
    },

    cancel: function() {
      this._cancel(false);
    },

    withdrawAndCancel: function() {
      this._cancel(true);
    },

    reschedule: function() {
      var model = this.get('model');

      this.transitionToRoute('dashboard.schedule-interaction', this.get('model.id'));
      model.set('scheduledCallTime', null);
      model.set('actioned', false);

      this.set('requestPromise', PromiseController.create({
        promise: model.save().then(() => {
          this.get('dashboard').propertyDidChange('scheduledInteractions');
          this.get('dashboard').propertyDidChange('interactionsToSchedule');
        }, () => {
          notify('There has been an error rescheduling the interaction.', 'error');
          model.rollback();
          this.transitionToRoute('dashboard.interaction', this.get('model.id'));
        })
      }));
    },

    close: function() {
      this.get('sidePanel').send('hideDrawer');
    }
  }
});
