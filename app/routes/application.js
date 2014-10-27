import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      currentUser: this.store.find('user', 'me')
    });
  },

  actions: {
    error: function(error) {
      if (error.status === 401 || error.status === 404) {
        window.location.replace(config.APP.authUrl);
      } else {
        return true;
      }
    },

    queryParamsDidChange: function(params) {
      if(!Ember.isBlank(params.projectId)) {
        this.render('side-panel', { into: 'side-panel' })
      }
    }
  }
});
