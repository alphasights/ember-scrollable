import Ember from 'ember';
import logError from '../log-error';

export default Ember.Route.extend({
  currentUser: Ember.inject.service(),
  preferences: Ember.inject.service(),

  title: function(tokens) {
    if (tokens.length > 0) {
      return tokens.join(' - ');
    } else {
      return 'Phoenix';
    }
  },

  model: function() {
    return this.get('currentUser').authenticate().then((currentUser) => {
      return Ember.RSVP.hash({
        currentUser: currentUser,
        teams: this.store.find('team'),
        preferences: this.get('preferences').fetch()
      });
    });
  },

  afterModel: function(models) {
    this.set('currentUser.teams', models.teams);
    this.get('currentUser').setupIntercom();
  },

  actions: {
    error: function(error) {
      if (error.status === 401) {
        this.get('currentUser').redirectToLogin();
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
