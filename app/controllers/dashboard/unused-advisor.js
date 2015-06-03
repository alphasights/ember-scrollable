import Ember from 'ember';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';
import notify from 'phoenix/helpers/notify';

export default Ember.Controller.extend(ModelsNavigationMixin, {
  needs: ['dashboard', 'currentUser'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),
  currentUser: Ember.computed.oneWay('controllers.currentUser.model'),

  navigableModels: Ember.computed.oneWay('dashboard.unusedAdvisors'),
  modelRouteParams: ['dashboard.unused-advisor'],

  model: null,
  showFollowUp: false,
  email: null,
  emailTemplate: Ember.computed.oneWay('emailTemplates.firstObject'),

  emailTemplateDidChange: Ember.observer('emailTemplate.body', function() {
    var email = this.get('email');

    if (email != null) {
      email.set('body', this.get('emailTemplate.body'));
    }
  }).on('init'),

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    },

    remove: function() {
      if (window.confirm('Are you sure you want to remove the advisor from the list?')) {
        this.get('model').destroyRecord().then(() => {
          notify(`The advisor ${this.get('model.advisor.name')} was removed from the list`);
          this.get('sidePanel').send('close');
        });
      }
    },

    toggleFollowUp: function() {
      this.toggleProperty('showFollowUp');
    }
  }
});
