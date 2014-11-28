import Ember from 'ember';
import { logError } from '../errors';

export default Ember.Route.extend({
  isLoaded: false,

  model: function() {
    return Ember.RSVP.hash({
      currentUser: this.store.find('user', 'me')
    });
  },

  afterModel: function(models) {
    this.controllerFor('currentUser').set('model', models.currentUser);
    this.set('isLoaded', true);
  },

  actions: {
    error: function(error) {
      if (error.status === 401 || error.status === 404) {
        window.location.replace(config.APP.authUrl);
      } else {
        logError(error);

        if(!this.get('isLoaded')) {
          var view = this.container.lookup('view:error').append();
          this.router.one('didTransition', view, 'destroy');
        }

        return true;
      }
    }
  }
});
