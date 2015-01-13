import Ember from 'ember';

export default Ember.ObjectController.extend({
  teamSelecting: false,
  selectedTeam: null,

  queryParams: {
    sortPropertyId: 'sort_by'
  },

  sortPropertyId: 'priority',

  pistachioUrl: function() {
    return `${EmberENV.pistachioUrl}/whiteboard`;
  }.property(),

  selectedTeamDidChange: function() {
    this.get('controller').send('closeTeamSelector');
    this.get('controller').transitionToRoute('team', this.get('selection.id'));
  },

  actions: {
    closeTeamSelector: function() {
      this.set('teamSelecting', false);
    },

    submitFeedback: function() {
      /* jshint newcap: false */
      Intercom('showNewMessage');
      /* jshint newcap: true */
    },

    selectTeam: function() {
      this.set('teamSelecting', true);
    }
  }
});
