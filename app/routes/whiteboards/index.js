import Ember from 'ember';

export default Ember.Route.extend({
  warden: Ember.inject.service(),
  currentUser: Ember.computed.oneWay('warden.currentUser'),

  beforeModel: function() {
    this.transitionTo('whiteboards.whiteboard', `team-${this.get('currentUser.teamId')}`);
  }
});
