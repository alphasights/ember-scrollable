import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['currentUser'],
  currentUser: Ember.computed.alias('controllers.currentUser'),
  preferences: Ember.computed.alias('controllers.currentUser.preferences'),

  actions: {
    toggleCollapse: function(isCollapsed) {
      var preferences = this.get('preferences');

      if (preferences === undefined) {
        this.store.createRecord('preferences',  {
          user: this.get('controllers.currentUser.content'),
          sideBarCollapsed: isCollapsed
        }).save();
      } else {
        preferences.set('sideBarCollapsed', isCollapsed);
        preferences.save();
      }
    }
  }
});
