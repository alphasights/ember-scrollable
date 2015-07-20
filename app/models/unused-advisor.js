import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  project: DS.belongsTo('project', { async: false }),
  termsSentAt: DS.attr('date'),
  advisor: DS.belongsTo('advisor', { async: false }),

  defaultEmail: Ember.computed.oneWay('advisor.emails.firstObject')
});
