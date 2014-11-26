import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['currentUser', 'application'],
  currentUser: Ember.computed.alias('controllers.currentUser'),
  preference: Ember.computed.alias('controllers.application.preference'),

  actions: {
    toggleCollapse: function(isCollapsed) {
      var preference = this.get('preference');

      if (preference === undefined) {
        this.store.createRecord('preference',  {
          user: this.get('controllers.currentUser.content'),
          sideBarCollapsed: isCollapsed
        }).save();
      } else {
        preference.set('sideBarCollapsed', isCollapsed);
        preference.save();
      }
    }
  }
});
