import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('whiteboards.whiteboard', `team-${this.controllerFor('currentUser').get('model.teamId')}`);
  }
});
