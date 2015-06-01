import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['currentUser'],
  currentUser: Ember.computed.oneWay('controllers.currentUser'),
  preferences: Ember.computed.oneWay('currentUser.preferences'),

  navigationItems: [{
    id: 'dashboard', name: 'Dashboard', routeName: 'dashboard'
  }, {
    id: 'projects', name: 'Projects', routeName: 'projects'
  }, {
    id: 'whiteboards', name: 'Whiteboards', routeName: 'whiteboards'
  }, {
    id: 'performance', name: 'Performance', routeName: 'performance'
  }],

  actionItems: [{
    name: 'feedback',
    label: 'Feedback'
  }, {
    name: 'logout',
    label: 'Logout'
  }],

  actions: {
    savePreferences: function() {
      this.get('preferences').save();
    },

    logout: function() {
      window.location.replace(`${EmberENV.pistachioUrl}/logout`);
    },

    feedback: function() {
      /* jshint newcap: false */
      Intercom('show');
      /* jshint newcap: true */
    }
  }
});
