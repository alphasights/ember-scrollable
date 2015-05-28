import Ember from 'ember';

export default Ember.Mixin.create({
  needs: ['currentUser'],
  currentUser: Ember.computed.oneWay('controllers.currentUser'),
  teamId: null,
  teams: Ember.computed.oneWay('currentUser.teams'),

  selectedTeam: Ember.computed('teamId', 'teams.@each.id', function(_, value) {
    if (arguments.length > 1) {
      if (value != null) {
        this.set('teamId', value.get('id'));
      } else {
        this.set('teamId', null);
      }
    }

    var teamId = this.get('teamId');

    if (teamId != null) {
      return this.get('teams').findBy('id', teamId);
    } else {
      return null;
    }
  }),

  queryParams: {
    teamId: 'team_id'
  },
});
