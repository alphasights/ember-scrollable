import Ember from 'ember';

export default Ember.ObjectController.extend({
  preferences: null,

  modelDidChange: function() {
    var model = this.get('model');

    analytics.identify(
      this.get('initials'),
      _(model.toJSON()).pick('initials', 'name', 'developer')
    );

    moment.tz.setDefault(model.get('timeZone'));
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
    }
  }
});
