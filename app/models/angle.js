import DS from 'ember-data';

export default DS.Model.extend({
  angleTeamMemberships: DS.hasMany('angleTeamMembership'),
  project: DS.belongsTo('project'),
  title: DS.attr('string'),
  createdAt: DS.attr('date'),

  membersUpdatedAt: null,
  membershipsUpdatedAt: null,

  memberships: function() {
    return this.get('angleTeamMemberships');
  }.property('angleTeamMemberships.[]'),

  members: function() {
    return this.get('memberships').mapBy('user');
  }.property('memberships.[]'),

  membershipsDidChange: function() {
    this.set('membershipsUpdatedAt', new Date());
  }.observes('memberships.[]'),

  membersDidChange: function() {
    this.set('membersUpdatedAt', new Date());
  }.observes('members.[]')
});
