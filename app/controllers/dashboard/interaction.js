import Ember from 'ember';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';
import InteractionCompletion from 'phoenix/models/interaction-completion';

var qualityOptionsMapping = {
  'good': 'Good',
  'bad': 'Bad'
};

export default Ember.Controller.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),

  navigableModels: Ember.computed.oneWay('dashboard.upcomingInteractions'),
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

  actions: {
    chargeClient: function() {
      this.set('requestPromise', this.get('completion').save());
    },

    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    },

    toggleForm: function() {
      this.toggleProperty('showForm');
    }
  }
});
