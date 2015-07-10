import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':team-switcher'],

  teams: null,
  teamId: null,

  actions: {
    changeSelectedTeam: function(selectedTeamId) {
      this.sendAction('selectTeam', selectedTeamId || null);
    }
  }
});
