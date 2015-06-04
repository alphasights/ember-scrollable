import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  preferences: Ember.inject.service(),

  navigationItems: [{
    id: 'dashboard', name: 'Dashboard', routeName: 'dashboard'
  }, {
    id: 'projects', name: 'Projects', routeName: 'projects'
  }, {
    id: 'whiteboards', name: 'Whiteboards', routeName: 'whiteboards'
  }, {
    id: 'performance', name: 'Performance', routeName: 'performance'
  }],

  actions: {
    savePreferences: function() {
      this.get('preferences.model').save();
    },

    logout: function() {
      this.get('currentUser').logout();
    }
  }
});
