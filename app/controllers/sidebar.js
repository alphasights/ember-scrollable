import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['currentUser'],

  currentUser: Ember.computed.oneWay('controllers.currentUser'),
  preferences: Ember.computed.oneWay('currentUser.preferences'),

  actions: {
    toggleCollapse: function() {
      var preferences = this.get('preferences');

      preferences.toggleProperty('sidebarCollapsed');
      preferences.save();
    },

    logout: function() {
      window.location.replace(`${EmberENV.pistachioUrl}/logout`);
    }
  }
});
