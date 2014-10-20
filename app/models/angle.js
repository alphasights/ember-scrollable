import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  angleTeamMemberships: DS.hasMany('angleTeamMembership'),
  project: DS.belongsTo('project'),
  angleTeamMembershipsUpdatedAt: null,

  teamMembers: (function() {
    return this.get('angleTeamMemberships').mapBy('teamMember');
  }).property('angleTeamMemberships.@each.teamMember'),

  angleTeamMembershipsDidChange: (function() {
    this.set('angleTeamMembershipsUpdatedAt', new Date());
  }).observes('angleTeamMemberships.[]')
});
