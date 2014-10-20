import DS from 'ember-data';

const STATUSES = ['high', 'medium', 'low'];

export default DS.Model.extend({
  status: DS.attr('string'),
  name: DS.attr('string'),
  proposedAdvisorsCount: DS.attr('number'),
  leftToScheduleAdvisorsCount: DS.attr('number'),
  upcomingInteractionsCount: DS.attr('number'),
  clientCode: DS.attr('string'),
  analyst_1: DS.belongsTo('user'),
  angles: DS.hasMany('angle'),
  detailsUrl: DS.attr('string'),
  createdAt: DS.attr('date'),
  index: DS.attr('number'),
  teamMembersUpdatedAt: null,
  targetValuesUpdatedAt: null,

  teamMembers: (function() {
    return this.get('angleTeamMemberships').mapBy('teamMember');
  }).property('angleTeamMemberships.@each.teamMember'),

  targetValues: (function() {
    return this.get('angleTeamMemberships').mapBy('targetValue');
  }).property('angleTeamMemberships.@each.targetValue'),

  statusIndex: (function() {
    return STATUSES.indexOf(this.get('status'));
  }).property('status'),

  nextStatusIndex: (function() {
    return (this.get('statusIndex') + 1) % STATUSES.length;
  }).property('statusIndex'),

  nextStatus: (function() {
    return STATUSES.objectAt(this.get('nextStatusIndex'));
  }).property('nextStatusIndex'),

  teamMembersDidChange: (function() {
    this.set('teamMembersUpdatedAt', new Date());
  }).observes('teamMembers.[]'),

  targetValuesDidChange: (function() {
    this.set('targetValuesUpdatedAt', new Date());
  }).observes('angleTeamMemberships.@each.targetValue'),

  angleTeamMemberships: (function() {
    return this.get('angles').mapBy('angleTeamMemberships.content').reduce(function(m, angleTeamMemberships) {
      return m.concat(angleTeamMemberships);
    }, []);
  }).property('angles.@each.angleTeamMembershipsUpdatedAt'),

  cycleStatus: function() {
    this.set('status', this.get('nextStatus'));
  }
});
