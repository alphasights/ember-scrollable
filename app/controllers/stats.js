import Ember from 'ember';

var statWithFallback = function(statName) {
  return (function() {
    var usersCount = Math.max(this.get('teamMembers.length'), 1);
    return Number(this.get(statName) / usersCount).toFixed(1);
  }).property('teamMembers.length', statName);
};

export default Ember.ObjectController.extend({
  needs: ['team', 'teams'],
  team: Ember.computed.alias('controllers.team'),
  teams: Ember.computed.alias('controllers.teams'),
  red: statWithFallback('redProjectsCount'),
  leftToSchedule: statWithFallback('leftToScheduleCount'),
  delivered: statWithFallback('proposedAdvisorsCount'),
  upcoming: statWithFallback('upcomingInteractionsCount'),
  toGo: statWithFallback('targetValuesCount'),
  projects: [],

  teamMembers: (function() {
    var selectedTeamMember = this.get('teams.selectedTeamMember');

    if (selectedTeamMember != null) {
      return [selectedTeamMember];
    } else {
      return this.get('team.users');
    }
  }).property('team.users', 'teams.selectedTeamMember'),

  stats: (function() {
    return Ember.A([
      this.stat().create({
        name: 'Red',
        valueBinding: 'red',
        "class": 'red'
      }), this.stat().create({
        name: 'Left to Schedule',
        valueBinding: 'leftToSchedule',
        "class": 'left-to-schedule'
      }), this.stat().create({
        name: 'Upcoming',
        valueBinding: 'upcoming',
        "class": 'upcoming'
      }), this.stat().create({
        name: 'Delivered',
        valueBinding: 'delivered',
        "class": 'delivered'
      }), this.stat().create({
        name: 'Left to Deliver',
        valueBinding: 'toGo',
        "class": 'left-to-deliver'
      })
    ]);
  }).property(),

  redProjectsCount: (function() {
    return this.get('projects').filterBy('status', 'high').reduce((m, project) => {
      return m + this.teamMembersCount(project);
    }, 0);
  }).property('projects.@each.status', 'projects.@each.teamMembersUpdatedAt'),

  leftToScheduleCount: (function() {
    return this.perPersonAverage('leftToScheduleAdvisorsCount');
  }).property('projects.@each.leftToScheduleAdvisorsCount', 'projects.@each.teamMembersUpdatedAt'),

  proposedAdvisorsCount: (function() {
    return this.perPersonAverage('proposedAdvisorsCount');
  }).property('projects.@each.proposedAdvisorsCount', 'projects.@each.teamMembersUpdatedAt'),

  upcomingInteractionsCount: (function() {
    return this.perPersonAverage('upcomingInteractionsCount');
  }).property('projects.@each.proposedAdvisorsCount', 'projects.@each.teamMembersUpdatedAt'),

  targetValuesCount: (function() {
    return this.get('projects').reduce((m, project) => {
      var targetValuesCount = project.get('targetValues').reduce((function(m, targetValue) {
        return m + targetValue;
      }), 0);

      return m + (targetValuesCount / Math.max(1, project.get('teamMembers.length'))) * this.teamMembersCount(project);
    }, 0);
  }).property('projects.@each.targetValuesUpdatedAt', 'projects.@each.teamMembersUpdatedAt'),

  stat: function() {
    return Ember.ObjectProxy.extend({
      content: this
    });
  },

  teamMembersCount: function(project) {
    var teamMembers = project.get('teamMembers').filter((teamMember) => {
      return this.get('teamMembers').contains(teamMember);
    });

    return teamMembers.get('length');
  },

  perPersonAverage: function(stat) {
    return this.get('projects').reduce((m, project) => {
      return m + (project.get(stat) / Math.max(1, project.get('teamMembers.length'))) * this.teamMembersCount(project);
    }, 0);
  }
});
