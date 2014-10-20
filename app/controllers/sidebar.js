import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['currentUser'],
  currentUser: Ember.computed.alias('controllers.currentUser')
});
