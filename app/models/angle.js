import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  angleTeamMemberships: DS.hasMany('angleTeamMembership'),
  project: DS.belongsTo('project'),
  title: DS.attr('string'),
  createdAt: DS.attr('date'),

  membersUpdatedAt: null,
  membershipsUpdatedAt: null,

  memberships: Ember.computed('angleTeamMemberships.[]', function() {
    return this.get('angleTeamMemberships');
  }),

  members: Ember.computed('memberships.[]', function() {
    return this.get('memberships').mapBy('user');
  }),

  membershipsDidChange: Ember.observer('memberships.[]', function() {
    this.set('membershipsUpdatedAt', new Date());
  }),

  membersDidChange: Ember.observer('members.[]', function() {
    this.set('membersUpdatedAt', new Date());
  })
});
