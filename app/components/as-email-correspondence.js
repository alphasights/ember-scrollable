import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':email-correspondence'],

  emails: null,
  isViewingEmail: false,
  actionHandler: null,

  actions: {
    viewEmail: function(email) {
      this.get('actionHandler').send('viewEmail', email);
    }
  }
});
