import DS from 'ember-data';

export default DS.Model.extend({
  angleTeamMemberships: DS.hasMany('angleTeamMembership'),
  membersUpdatedAt: null,
  project: DS.belongsTo('project'),
  title: DS.attr('string'),

  members: (function() {
    return this.get('angleTeamMemberships').mapBy('teamMember');
  }).property('angleTeamMemberships.[]'),

  membersDidChange: function() {
    this.set('membersUpdatedAt', new Date());
  }.observes('members.[]')
});
