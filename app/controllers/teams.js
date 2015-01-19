import Ember from 'ember';

export default Ember.ObjectController.extend({
  showTeamSelect: false,
  selectedTeam: null,

  queryParams: {
    sortPropertyId: 'sort_by'
  },

  sortPropertyId: 'priority',

  pistachioUrl: function() {
    return `${EmberENV.pistachioUrl}/whiteboard`;
  }.property(),

  selectedTeamDidChange: function() {
    this.get('controller').send('closeTeamSelect');
    this.get('controller').transitionToRoute('teams.team', this.get('selectedTeam'));
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
