import Ember from 'ember';

export default Ember.ObjectController.extend({
  preferences: null,

  modelDidChange: function() {
    analytics.identify(
      this.get('initials'),
      _(this.get('model').toJSON()).pick('initials', 'name', 'developer')
    );
  }.observes('model'),

  setupIntercom: function() {
    /* jshint newcap: false */
    Intercom('boot', {
      app_id: EmberENV.intercomAppId,
      email: this.get('email'),
      created_at: this.get('createdAt'),
      name: this.get('name'),
      user_id: this.get('id'),
      user_hash: this.get('intercomUserHash'),
      visited_phoenix: true
    });
    /* jshint newcap: true */
  },

  actions: {
    boot: function() {
      this.setupIntercom();

      if (this.get('preferences') === null) {
        this.set('preferences', this.store.createRecord('preferences'));
        this.get('preferences').save();
      }
    }
  }
});
