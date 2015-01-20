import Ember from 'ember';

export default Ember.ObjectController.extend({
  showTeamSelect: false,
  selectedTeam: null,

  pistachioUrl: function() {
    return `${EmberENV.pistachioUrl}/whiteboard`;
  }.property(),

  selectedTeamDidChange: function() {
    this.set('showTeamSelect', false);
    this.transitionToRoute('teams.team', this.get('selectedTeam.id'));
  },

  actions: {
    toggleTeamSelect: function() {
      this.toggleProperty('showTeamSelect');
    },

    submitFeedback: function() {
      /* jshint newcap: false */
      Intercom('showNewMessage');
      /* jshint newcap: true */
    }
  }
});
