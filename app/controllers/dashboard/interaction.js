import Ember from 'ember';
import ModelsNavigationMixin from 'phoenix/mixins/models-navigation';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';

export default Ember.ObjectController.extend(ModelsNavigationMixin, Saving, {

  // Validations run out of the box
  validations: {
    speakDialIn: {
      presence: true
    },
    from: {
      presence: true
    },
    majorTextArea: {
      presence: true
    }
  },

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

  checklistItems: Ember.computed.sort('model.checklistItems', 'checklistItemsSorting'),
  checklistItemsSorting: ['completed', 'createdAt'],

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    }
  }
});
