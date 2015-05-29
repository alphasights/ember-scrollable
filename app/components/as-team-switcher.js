import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':team-switcher'],

  teams: null,
  teamId: null,

  selectedTeam: Ember.computed('teamId', 'teams.@each.id', function(_, value) {
    if (arguments.length > 1) {
      if (value != null) {
        this.sendAction('selectTeam', value.get('id'));
      } else {
        this.sendAction('selectTeam', null);
      }
    }

    var teamId = this.get('teamId');

    if (teamId != null) {
      return this.get('teams').findBy('id', teamId);
    } else {
      return null;
    }
  }),
});
