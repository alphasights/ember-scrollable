import Ember from 'ember';

export default Ember.Controller.extend({
  warden: Ember.inject.service(),
  preferences: Ember.inject.service(),

  currentUser: Ember.computed.oneWay('warden.currentUser'),
  userPreferences: Ember.computed.oneWay('preferences.model'),

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
    saveUserPreferences: function() {
      this.get('userPreferences').save();
    },

    logout: function() {
      window.location.replace(`${EmberENV.pistachioUrl}/logout`);
    }
  }
});
