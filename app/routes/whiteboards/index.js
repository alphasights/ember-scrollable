import Ember from 'ember';

export default Ember.Route.extend({
  currentUser: Ember.inject.service(),

  beforeModel: function() {
    this.transitionTo('whiteboards.whiteboard', `team-${this.get('currentUser.teamId')}`);
  }
});
