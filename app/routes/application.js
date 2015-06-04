import Ember from 'ember';
import logError from '../log-error';

export default Ember.Route.extend({
  warden: Ember.inject.service(),
  preferences: Ember.inject.service(),

  currentUser: Ember.computed.oneWay('warden.currentUser'),

  model: function() {
    return Ember.RSVP.hash({
      currentUser: this.get('warden').authenticateUser(),
      teams: this.store.find('team'),
      preferences: this.get('preferences').fetch()
    });
  },

  afterModel: function(models) {
    this.set('currentUser.teams', models.teams);
    this.get('warden').setupIntercom();
  },

  actions: {
    error: function(error) {
      if (error.status === 401) {
        this.get('warden').redirectToLogin();
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
