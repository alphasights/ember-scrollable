import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  needs: ['currentUser'],
  currentUser: Ember.computed.alias('controllers.currentUser'),
  preferences: Ember.computed.alias('currentUser.preferences'),
  logoutUrl: `${config.APP.pistachioUrl}/logout`,

  actions: {
    toggleCollapse: function(isCollapsed) {
      var preferences = this.get('preferences');

      preferences.set('sidebarCollapsed', !isCollapsed);
      preferences.save();
    }
  }
});
