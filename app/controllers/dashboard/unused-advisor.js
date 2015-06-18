import Ember from 'ember';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';
import notify from 'phoenix/helpers/notify';

export default Ember.Controller.extend(ModelsNavigationMixin, {
  needs: ['dashboard'],
  dashboard: Ember.computed.oneWay('controllers.dashboard'),

  navigableModels: Ember.computed.oneWay('dashboard.unusedAdvisors'),
  modelRouteParams: ['dashboard.unused-advisor'],

  queryParams: ["page", "perPage"],
  pageBinding: "emails.page",
  perPageBinding: "emails.perPage",
  totalPagesBinding: "emails.totalPages",
  page: 1,
  perPage: 10,
  model: null,
  showFollowUp: false,
  email: null,
  emailTemplates: null,

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('dashboard');
    },

    remove: function() {
      this.get('model').destroyRecord().then(() => {
        notify(`The advisor ${this.get('model.advisor.name')} was removed from the list.`);
        this.get('sidePanel').send('close');
      });
    },

    toggleFollowUp: function() {
      this.get('sidePanel').send('toggleDrawer');
    },

    preview: function() {
      this.get('emailComposer').send('togglePreview');
    },

    send: function() {
      var email = this.get('email');

      email.save().then(() => {
        notify(`Your email has been sent.`);
        this.get('sidePanel').send('close');
      }).catch(function() {
        notify('There has been an error sending your email.', 'error');
      });
    },
  }
});
