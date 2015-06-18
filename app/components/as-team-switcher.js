import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':team-switcher'],

  teams: null,
  teamId: null,

  selectedTeam: Ember.computed('teamId', 'teams.@each.id', {
    set: function(_, value) {
      if (value != null) {
        this.sendAction('selectTeam', value.get('id'));
      } else {
        this.sendAction('selectTeam', null);
      }

      return value;
    },

    get: function() {
      var teamId = this.get('teamId');

      if (teamId != null) {
        return this.get('teams').findBy('id', teamId);
      } else {
        return null;
      }
    }
  }),
});
