import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      currentUser: this.store.find('user', 'me')
    });
  },

  afterModel: function(models) {
    this.controllerFor('currentUser').set('model', models.currentUser);
  },

  actions: {
    error: function(error) {
      if (error.status === 401 || error.status === 404) {
        window.location.replace(config.APP.authUrl);
      } else if (error.status === 500) {
        new Messenger().post({
          message: 'Something went wrong with that request, please try again.',
          type: 'error',
          showCloseButton: true
        });
      } else {
        return true;
      }
    }
  }
});
