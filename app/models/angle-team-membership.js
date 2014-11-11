import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  angle: DS.belongsTo('angle'),
  createdAt: DS.attr('date', { defaultValue: function() { return new Date(); } }),
  teamMember: DS.belongsTo('user'),
  targetValue: DS.attr('number', { defaultValue: 0 }),

  user: Ember.computed.alias('teamMember'),
  deliveryTarget: Ember.computed.alias('targetValue')
});
