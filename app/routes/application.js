import Ember from 'ember';
import logError from '../log-error';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      currentUser: this.store.find('user', 'me'),
      preferences: this.store.find('preferences')
    });
  },

  afterModel: function(models) {
    var preferences = models.preferences.get('firstObject');
    var currentUser = this.controllerFor('currentUser');

    if (preferences == null) {
      preferences = this.store.createRecord('preferences');
      preferences.save();
    }

    currentUser.set('model', models.currentUser);
    currentUser.set('preferences', preferences);
    currentUser.send('boot');
  },

  actions: {
    error: function(error) {
      if (error.status === 401) {
        window.location.replace(`${EmberENV.pistachioUrl}/system`);
      } else if (error.status === 404) {
        logError(error);
        this.render('not_found', { into: 'application' });
      } else {
        logError(error);
        return true;
      }
    }
  }
});
