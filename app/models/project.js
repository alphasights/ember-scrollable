import DS from 'ember-data';

var PRIORITIES = ['low', 'medium', 'high'];

export default DS.Model.extend({
  analyst_1: DS.belongsTo('user'),
  angles: DS.hasMany('angle'),
  clientCode: DS.attr('string'),
  createdAt: DS.attr('date'),
  detailsUrl: DS.attr('string'),
  leftToScheduleAdvisorsCount: DS.attr('number'),
  name: DS.attr('string'),
  proposedAdvisorsCount: DS.attr('number'),
  status: DS.attr('string'),
  upcomingInteractionsCount: DS.attr('number'),
  targetValuesUpdatedAt: null,
  priority: Ember.computed.alias('status'),

  priorityIndex: function() {
    return PRIORITIES.indexOf(this.get('priority'));
  }.property('priority'),

  angleTeamMemberships: (function() {
    return this.get('angles').
      mapBy('angleTeamMemberships.content').
      reduce(function(m, angleTeamMemberships) {
        return m.concat(angleTeamMemberships);
      }, []);
  }).property('angles.@each.angleTeamMembershipsUpdatedAt'),

  members: function() {
    return _(this.get('angles').toArray()).
      chain().
      map(function(a) { return a.get('members'); }).
      flatten().
      uniq(false, function(a) { return a.get('id'); }).
      value();
  }.property('angles.@each.membersUpdatedAt'),

  targetValues: (function() {
    return this.get('angleTeamMemberships').mapBy('targetValue');
  }).property('angleTeamMemberships.@each.targetValue'),

  totalTarget: function() {
    return this.get('targetValues').reduce(function(previous, current) {
      return previous + current;
    }, 0);
  }.property('targetValues.[]')
});
