import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  teamId: null,
  whiteboardId: null,

  pistachioUrl: Ember.computed(function() {
    return `${EmberENV.pistachioUrl}/whiteboard`;
  }),

  actions: {
    submitFeedback: function() {
      /* jshint newcap: false */
      Intercom('showNewMessage');
      /* jshint newcap: true */
    },

    selectTeam: function(teamId) {
      this.transitionToRoute('whiteboards.whiteboard', `team-${teamId}`);
    },

    selectWhiteboard: function(whiteboardId) {
      this.transitionToRoute('whiteboards.whiteboard', whiteboardId);
    }
  }
});
