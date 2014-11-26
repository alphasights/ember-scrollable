import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['currentUser'],
  currentUser: Ember.computed.alias('controllers.currentUser'),
  preferences: Ember.computed.alias('controllers.currentUser.preferences'),

  actions: {
    toggleCollapse: function(isCollapsed) {
      var preferences = this.get('preferences');

      preferences.set('sideBarCollapsed', isCollapsed);
      preferences.save();
    }
  }
});
