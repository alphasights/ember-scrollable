import DS from 'ember-data';
import Ember from 'ember';

const PRIORITIES = ['low', 'medium', 'high'];

export default DS.Model.extend({
  analyst_1: DS.belongsTo('user'),
  angles: DS.hasMany('angle'),
  clientCode: DS.attr('string'),
  createdAt: DS.attr('date'),
  detailsUrl: DS.attr('string'),
  interactions: DS.hasMany('interaction'),
  leftToScheduleAdvisorsCount: DS.attr('number'),
  name: DS.attr('string'),
  proposedAdvisorsCount: DS.attr('number'),
  status: DS.attr('string'),
  upcomingInteractionsCount: DS.attr('number'),
  index: DS.attr('number'),

  deliveredAdvisorsCount: Ember.computed.alias('proposedAdvisorsCount'),
  lead: Ember.computed.alias('analyst_1'),
  notScheduledInteractionsCount: Ember.computed.alias('leftToScheduleAdvisorsCount'),
  priority: Ember.computed.alias('status'),
  scheduledInteractionsCount: Ember.computed.alias('upcomingInteractionsCount'),

  memberships: Ember.computed('angles.@each.membershipsUpdatedAt', function() {
    return _(this.get('angles').map(function(angle) {
      return angle.get('memberships').toArray();
    })).flatten();
  }),

  members: Ember.computed('angles.@each.membersUpdatedAt', function() {
    return _(this.get('angles').mapBy('members'))
      .chain()
      .flatten()
      .uniq()
      .value();
  }),

  priorityIndex: Ember.computed('priority', function() {
    return PRIORITIES.indexOf(this.get('priority'));
  }),

  deliveryTarget: Ember.computed('memberships.@each.deliveryTarget', function() {
    return this.get('memberships')
      .mapBy('deliveryTarget')
      .reduce(function(previous, current) {
        return previous + current;
      }, 0);
  }),

  pistachioUrl: Ember.computed('id', function() {
    return `${EmberENV.pistachioUrl}/projects/${this.get('id')}`;
  }),
});
