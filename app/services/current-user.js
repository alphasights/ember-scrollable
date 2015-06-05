import Ember from 'ember';

export default Ember.Service.extend({
  model: null,
  teams: null,

  id: Ember.computed.oneWay('model.id'),
  name: Ember.computed.oneWay('model.name'),
  teamId: Ember.computed.oneWay('model.teamId'),

  authenticate: function() {
    return this.store.find('user', 'me').then((user) => {
      this.store.recordForId('user', 'me').unloadRecord();
      this.set('model', user);
      return user;
    });
  },

  redirectToLogin: function() {
    window.location.replace(`${EmberENV.pistachioUrl}/system`);
  },

  logout: function() {
    window.location.replace(`${EmberENV.pistachioUrl}/logout`);
  },

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
  }
});
