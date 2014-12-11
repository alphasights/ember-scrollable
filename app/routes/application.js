import Ember from 'ember';
import logError from '../log-error';
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

  setupController: function(controller, models) {
    this.bootIntercom(models.currentUser);
  },

  bootIntercom: function(user){
    if (typeof Intercom === 'undefined') { return; }

    /* jshint newcap: false */
    Intercom('boot', {
      app_id: config.APP.intercomAppId,
      email: user.get('email'),
      created_at: user.get('createdAt'),
      name: user.get('name'),
      user_id: user.get('id'),
      user_hash: user.get('intercomUserHash')
    });
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
