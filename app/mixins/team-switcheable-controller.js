import Ember from 'ember';

export default Ember.Mixin.create({
  currentUser: Ember.inject.service(),
  teamId: null,
  whiteboardId: null,

  isTeamView: Ember.computed('teamId', function() {
    return this.get('teamId') !== null;
  }),

  queryParams: {
    teamId: 'team_id',
    whiteboardId: 'whiteboard_id'
  },

  actions: {
    selectTeam: function(teamId) {
      this.set('whiteboardId', null);
      this.set('teamId', teamId);
    },

    selectWhiteboard: function(whiteboardId) {
      this.set('teamId', null);
      this.set('whiteboardId', whiteboardId);
    }
  }
});
