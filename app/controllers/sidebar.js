import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  needs: ['currentUser'],

  currentUser: Ember.computed.alias('controllers.currentUser'),
  preferences: Ember.computed.alias('currentUser.preferences'),

  actions: {
    toggleCollapse: function() {
      var preferences = this.get('preferences');

      preferences.toggleProperty('sidebarCollapsed');
      preferences.save();
    },

    logout: function() {
      window.location.replace(`${config.APP.pistachioUrl}/logout`);
    }
  }
});
