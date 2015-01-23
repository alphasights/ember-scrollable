import Ember from 'ember';

export default Ember.ObjectController.extend({
  showTeamSelect: false,
  selectedTeam: null,
  teamSelectChanged: false,
  multipleTeamsAvailable: Ember.computed.gt('length', 1),

  pistachioUrl: function() {
    return `${EmberENV.pistachioUrl}/whiteboard`;
  }.property(),

  onTeamSelectChange: function() {
    this.get('controller').set('teamSelectChanged', true);
  },

  selectedTeamDidChange: function() {
    if (this.get('teamSelectChanged')) {
      this.set('teamSelectChanged', false);
      this.set('showTeamSelect', false);
      this.transitionToRoute('teams.team', this.get('selectedTeam.id'));
    }
  }.observes('selectedTeam'),

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
