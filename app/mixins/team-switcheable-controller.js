import Ember from 'ember';

export default Ember.Mixin.create({
  needs: ['currentUser'],
  currentUser: Ember.computed.oneWay('controllers.currentUser'),
  teamId: null,
  teams: Ember.computed.oneWay('currentUser.teams'),

  selectedTeam: Ember.computed('teamId', 'teams.@each.id', {
    get: function() {
      var teamId = this.get('teamId');

      if (teamId != null) {
        return this.get('teams').findBy('id', teamId);
      } else {
        return null;
      }
    },

    set: function(_, value) {
      if (value != null) {
        this.set('teamId', value.get('id'));
      } else {
        this.set('teamId', null);
      }

      return value;
    }
  }),

  queryParams: {
    teamId: 'team_id'
  },
});
