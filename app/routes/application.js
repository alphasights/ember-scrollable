import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      currentUser: this.store.find('user', 'me'),
      preference: this.store.find('preference')
    });
  },

  afterModel: function(models) {
    this.controllerFor('currentUser').set('model', models.currentUser);
    this.controllerFor('application').set('preference', models.preference.get('content')[0]);
  },

  actions: {
    error: function(error) {
      if (error.status === 401 || error.status === 404) {
        window.location.replace(config.APP.authUrl);
      } else {
        return true;
      }
    }
  }
});
