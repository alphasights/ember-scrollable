import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':team-switcher'],

  teams: Ember.computed.oneWay('user.teams'),
  whiteboards: Ember.computed.oneWay('user.whiteboards'),
  prompt: Ember.computed.oneWay('user.name'),
  teamId: null,
  whiteboardId: null,

  actions: {
    changeSelection: function(selectionId) {
      if (selectionId.lastIndexOf('team-', 0) === 0) {
        this.sendAction('selectTeam', selectionId.replace('team-', ''));
      } else if (selectionId.lastIndexOf('whiteboard-', 0) === 0) {
        this.sendAction('selectWhiteboard', selectionId.replace('whiteboard-', ''));
      } else {
        this.sendAction('selectTeam', null);
      }
    }
  }
});
