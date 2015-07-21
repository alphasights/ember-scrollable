import Ember from 'ember';

export default Ember.Route.extend({
  currentUser: Ember.inject.service(),

  beforeModel: function() {
    if (Ember.isPresent(this.get('currentUser.whiteboardId'))) {
      this.transitionTo('whiteboards.whiteboard', this.get('currentUser.whiteboardId'));
    } else {
      this.transitionTo('whiteboards.whiteboard', `team-${this.get('currentUser.teamId')}`);
    }
  }
});
