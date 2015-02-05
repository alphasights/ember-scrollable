import DS from 'ember-data';
import Ember from 'ember';

var PRIORITIES = ['low', 'medium', 'high'];

export default DS.Model.extend({
  analyst_1: DS.belongsTo('user'),
  angles: DS.hasMany('angle'),
  clientCode: DS.attr('string'),
  createdAt: DS.attr('utc'),
  detailsUrl: DS.attr('string'),
  interactions: DS.hasMany('interaction'),
  leftToScheduleAdvisorsCount: DS.attr('number'),
  name: DS.attr('string'),
  proposedAdvisorsCount: DS.attr('number'),
  status: DS.attr('string'),
  upcomingInteractionsCount: DS.attr('number'),

  deliveredAdvisorsCount: Ember.computed.alias('proposedAdvisorsCount'),
  lead: Ember.computed.alias('analyst_1'),
  notScheduledInteractionsCount: Ember.computed.alias('leftToScheduleAdvisorsCount'),
  priority: Ember.computed.alias('status'),
  scheduledInteractionsCount: Ember.computed.alias('upcomingInteractionsCount'),

  memberships: function() {
    return _(this.get('angles').map(function(angle) {
      return angle.get('memberships').toArray();
    })).flatten();
  }.property('angles.@each.membershipsUpdatedAt'),

  members: function() {
    return _(this.get('angles').mapBy('members'))
      .chain()
      .flatten()
      .uniq()
      .value();
  }.property('angles.@each.membersUpdatedAt'),

  priorityIndex: function() {
    return PRIORITIES.indexOf(this.get('priority'));
  }.property('priority'),

  deliveryTarget: function() {
    return this.get('memberships')
      .mapBy('deliveryTarget')
      .reduce(function(previous, current) {
        return previous + current;
      }, 0);
  }.property('memberships.@each.deliveryTarget')
});
