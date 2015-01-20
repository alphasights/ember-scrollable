import Ember from 'ember';

export default Ember.ObjectController.extend({
  showTeamSelect: false,
  selectedTeam: null,

  pistachioUrl: function() {
    return `${EmberENV.pistachioUrl}/whiteboard`;
  }.property(),

  selectedTeamDidChange: function() {
    this.send('closeTeamSelect');
    this.transitionToRoute('teams.team', this.get('selectedTeam.id'));
  },

  actions: {
    closeTeamSelect: function() {
      this.set('showTeamSelect', false);
    },

    openTeamSelect: function() {
      this.set('showTeamSelect', true);
    },

    submitFeedback: function() {
      /* jshint newcap: false */
      Intercom('showNewMessage');
      /* jshint newcap: true */
    }
  }
});
