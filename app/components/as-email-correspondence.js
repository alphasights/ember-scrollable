import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':email-correspondence'],

  emails: null,
  actionHandler: null,
  selectedEmail: null,

  actions: {
    viewEmail: function(email) {
      let previouslySelectedEmail = this.get('selectedEmail');

      if (previouslySelectedEmail) {
        previouslySelectedEmail.set('cssClass', '');
      }

      this.set('selectedEmail', email);
      email.set('cssClass', 'selected');
      this.get('actionHandler').send('viewEmail', email);
    }
  }
});
