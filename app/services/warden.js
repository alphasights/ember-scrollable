import Ember from 'ember';

export default Ember.Service.extend({
  currentUser: null,

  authenticateUser: function() {
    return this.fetchUser();
  },

  fetchUser: function() {
    return this.store.find('user', 'me').then((user) => {
      this.set('currentUser', user);
      return user;
    }, () => {
      this.redirectToLogin();
    });
  },

  redirectToLogin: function() {
    window.location.replace(`${EmberENV.pistachioUrl}/system`);
  },

  logout: function() {
    window.location.replace(`${EmberENV.pistachioUrl}/logout`);
  },

  currentUserDidChange: Ember.observer('currentUser', function() {
    analytics.identify(
      this.get('currentUser.initials'),
      _(this.get('currentUser').toJSON()).pick('initials', 'name', 'developer')
    );
  }),

  setupIntercom: function() {
    /* jshint newcap: false */
    Intercom('boot', {
      app_id: EmberENV.intercomAppId,
      email: this.get('currentUser.email'),
      created_at: this.get('currentUser.createdAt'),
      name: this.get('currentUser.name'),
      user_id: this.get('currentUser.id'),
      user_hash: this.get('currentUser.intercomUserHash'),
      visited_phoenix: true
    });
    /* jshint newcap: true */
  }
});

