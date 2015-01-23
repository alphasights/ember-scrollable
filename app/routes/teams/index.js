import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('teams.team', this.controllerFor('currentUser').get('teamId'));
  }
});
