import Ember from 'ember';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';
import notify from 'phoenix/helpers/notify';

export default Ember.Controller.extend(ModelsNavigationMixin, {
  dashboard: Ember.inject.controller(),
  preferences: Ember.inject.service(),

  navigableModels: Ember.computed.oneWay('dashboard.unusedAdvisors'),
  modelRouteParams: ['dashboard.unused-advisor'],

  queryParams: ['page', 'perPage'],
  pageBinding: 'emails.page',
  perPageBinding: 'emails.perPage',
  totalPagesBinding: 'emails.totalPages',
  page: 1,
  perPage: 10,
  model: null,
  selectedEmail: null,
  emailDelivery: null,
  emailTemplates: null,
  drawerContent: null,
  displayingPreview: false,

  selectedEmailTemplate: null,
  updateEmailDeliveryFields: Ember.observer('selectedEmailTemplate', 'emailDelivery', function() {
    var template = this.get('selectedEmailTemplate');

    if (Ember.isPresent(template)) {
      this.set('emailDelivery.body', template.get('body'));
      this.set('emailDelivery.subject', template.get('subject'));
    } else {
      this.set('emailDelivery.body', null);
      this.set('emailDelivery.subject', null);
    }
  }),

  _paramatizeEmailAddresses: function(emailString) {
    if (emailString != null) {
      return emailString.replace(/\s+/g, ',').replace(/,+/, ',');
    } else {
      return emailString;
    }
  },

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

    showFollowUp: function() {
      this.set('drawerContent', 'emailComposer');
      this.get('sidePanel').send('showDrawer');
    },

    viewEmail: function(email) {
      this.set('drawerContent', 'emailViewer');
      this.set('selectedEmail', email);
      this.get('sidePanel').send('showDrawer');
    },

    togglePreview: function() {
      this.toggleProperty('displayingPreview');
    },

    send: function() {
      let email = this.get('emailDelivery');

      email.setProperties({
        recipients: this._paramatizeEmailAddresses(email.get('recipients')),
        cc: this._paramatizeEmailAddresses(email.get('cc')),
        bcc: this._paramatizeEmailAddresses(email.get('bcc'))
      });

      email.save().then(() => {
        notify(`Your email has been sent.`);
        this.get('sidePanel').send('close');
        this.send('remove');
      }).catch(function() {
        notify('There has been an error sending your email.', 'error');
      });
    },

    close: function() {
      this.get('sidePanel').send('hideDrawer');
    },

    changeSelectedEmailTemplate: function(template) {
      this.set('selectedEmailTemplate', template);
      this.set('preferences.unusedAdvisorEmailTemplateId', template.get('id'));
      this.get('preferences').save();
    },
  }
});
