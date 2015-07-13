import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  briefDescription: DS.attr('string'),
  description: DS.attr('string'),
  version: DS.attr('string'),
  limit: DS.attr('number'),
  owner: DS.belongsTo('user'),
  featureParticipations: DS.hasMany('featureParticipation'),
  testers: Ember.computed.mapBy('featureParticipations', 'user'),
  badgeName: DS.attr('string')
});
