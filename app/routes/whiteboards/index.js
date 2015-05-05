import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('whiteboards.whiteboard', this.controllerFor('currentUser').get('teamId'));
  }
});
