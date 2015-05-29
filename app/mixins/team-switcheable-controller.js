import Ember from 'ember';

export default Ember.Mixin.create({
  needs: ['currentUser'],
  currentUser: Ember.computed.oneWay('controllers.currentUser'),
  teamId: null,
  teams: Ember.computed.oneWay('currentUser.teams'),

  isTeamView: Ember.computed('teamId', function() {
    return this.get('teamId') !== null;
  }),

  queryParams: {
    teamId: 'team_id'
  },

  actions: {
    selectTeam: function(teamId) {
      this.set('teamId', teamId);
    }
  }
});
