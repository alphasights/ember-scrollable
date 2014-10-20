import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transition) {
    this.replaceWith('team', this.controllerFor('currentUser').get('teamId'), {
      queryParams: {
        teamMemberId: transition.queryParams.user_id
      }
    });
  }
});
