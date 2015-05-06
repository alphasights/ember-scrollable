import Ember from 'ember';

export default Ember.ObjectController.extend({
  preferences: null,

  modelDidChange: Ember.observer('model', function() {
    analytics.identify(
      this.get('model.initials'),
      _(this.get('model').toJSON()).pick('initials', 'name', 'developer')
    );
  }),

  setupIntercom: function() {
    /* jshint newcap: false */
    Intercom('boot', {
      app_id: EmberENV.intercomAppId,
      email: this.get('model.email'),
      created_at: this.get('model.createdAt'),
      name: this.get('model.name'),
      user_id: this.get('model.id'),
      user_hash: this.get('model.intercomUserHash'),
      visited_phoenix: true
    });
    /* jshint newcap: true */
  },

  actions: {
    boot: function() {
      this.setupIntercom();
    }
  }
});
