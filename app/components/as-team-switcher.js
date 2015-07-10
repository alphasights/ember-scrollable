import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':team-switcher'],

  teams: null,
  teamId: null,

  actions: {
    changeSelectedTeam: function() {
      let selectedTeamId = event.target.value || null;
      this.sendAction('selectTeam', selectedTeamId);
    }
  }
});
