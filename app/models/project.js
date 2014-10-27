import DS from 'ember-data';

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

  angleTeamMemberships: (function() {
    return this.get('angles').
      mapBy('angleTeamMemberships.content').
      reduce(function(m, angleTeamMemberships) {
        return m.concat(angleTeamMemberships);
      }, []);
  }).property('angles.@each.angleTeamMembershipsUpdatedAt'),

  members: function() {
    return [this.get('analyst_1')].concat(
      _(this.get('angles').toArray()).
        chain().
        map(function(a) { return a.get('members'); }).
        flatten().
        value()
    ).uniq(false, function(a, b) { return a.get('id') === b.get('id'); });
  }.property('analyst_1', 'angles.@each.membersUpdatedAt'),

  targetValues: (function() {
    return this.get('angleTeamMemberships').mapBy('targetValue');
  }).property('angleTeamMemberships.@each.targetValue')
});
