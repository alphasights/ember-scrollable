import Ember from 'ember';
import TeamSwitcheableControllerMixin from 'phoenix/mixins/team-switcheable-controller';

export default Ember.Controller.extend(TeamSwitcheableControllerMixin, {
  teamMembers: Ember.computed.oneWay('model.teamMembers'),

  isTeamView: Ember.computed('teamId', function() {
    return this.get('teamId') !== null;
  }),

  selectedTeam: Ember.computed('teamId', 'teams.@each.id', {
    set: function(_, value) {
      if (value != null) {
        this.set('teamId', value.get('id'));
      } else {
        this.set('teamId', null);
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

  queryParams: {
    teamId: 'team_id'
  },

  scheduledInteractions: Ember.computed('model.interactions.@each.used', function() {
    return this.get('model.interactions')
      .filterBy('scheduledCallTime')
      .filterBy('used', false)
      .sortBy('scheduledCallTime');
  }),

  interactionsToSchedule: Ember.computed('model.interactions.@each.used', function() {
    return this.get('model.interactions')
      .filterBy('used', false)
      .filter(function(interaction) {
        return interaction.get('requestedAt') != null &&
          interaction.get('scheduledCallTime') == null &&
          !interaction.get('actioned');
      }).sort(function(a, b) {
        return -Ember.compare(a.get('requestedAt'), b.get('requestedAt'));
      });
  }),

  unusedAdvisors: Ember.computed('model.unusedAdvisors.[]', function() {
    return this.get('model.unusedAdvisors').sortBy('termsSentAt');
  })
});
