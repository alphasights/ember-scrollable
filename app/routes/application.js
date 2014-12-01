import Ember from 'ember';
import { logError } from '../errors';
import config from '../config/environment';

export default Ember.Route.extend({
  isLoaded: false,

  model: function() {
    return Ember.RSVP.hash({
      currentUser: this.store.find('user', 'me'),
      preferences: this.store.find('preferences')
    });
  },

  afterModel: function(models) {
    this.controllerFor('currentUser').set('model', models.currentUser);
    this.set('isLoaded', true);

    var preferences = models.preferences.get('firstObject');

    if (preferences == null) {
      preferences = this.store.createRecord('preferences');
      preferences.save();
    }

    this.controllerFor('currentUser').set('preferences', preferences);
  },

  actions: {
    error: function(error) {
      if (error.status === 401 || error.status === 404) {
        window.location.replace(config.APP.authUrl);
      } else {
        logError(error);

        if(!this.get('isLoaded')) {
          this.render('error');
        }

        return true;
      }
    }
  }
});
