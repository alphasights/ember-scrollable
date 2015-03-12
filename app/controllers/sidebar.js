import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['currentUser'],

  currentUser: Ember.computed.oneWay('controllers.currentUser'),

  actions: {
    toggleCollapse: function() {
      var preferences = this.get('currentUser.preferences');

      preferences.toggleProperty('sidebarCollapsed');
      preferences.save();
    },

    logout: function() {
      window.location.replace(`${EmberENV.pistachioUrl}/logout`);
    }
  }
});
