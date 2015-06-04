import Ember from 'ember';

export default Ember.Mixin.create({
  warden: Ember.inject.service(),
  currentUser: Ember.computed.oneWay('warden.currentUser'),
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
