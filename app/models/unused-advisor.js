import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  project: DS.belongsTo('project'),
  termsSentAt: DS.attr('date'),
  advisor: DS.belongsTo('advisor'),

  defaultEmail: Ember.computed.oneWay('advisor.emails.firstObject')
});
