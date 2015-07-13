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
      let id = Ember.isPresent(selectionId) ? selectionId : null;

      if (id.lastIndexOf('team-', 0) === 0) {
        this.sendAction('selectTeam', id.replace('team-', ''));
      } else if (id.lastIndexOf('whiteboard-', 0) === 0) {
        this.sendAction('selectWhiteboard', id.replace('whiteboard-', ''));
      }
    }
  }
});
