import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  angle: DS.belongsTo('angle'),
  teamMember: DS.belongsTo('user'),

  targetValue: DS.attr('number', {
    defaultValue: 0
  }),

  createdAt: DS.attr('date', {
    defaultValue: function() {
      return new Date();
    }
  }),

  project: Ember.computed.alias('angle.project')
});