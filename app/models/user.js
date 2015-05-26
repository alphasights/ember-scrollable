import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  createdAt: DS.attr('date'),
  avatarUrl: DS.attr('string'),
  deliveryPerformance: DS.belongsTo('deliveryPerformance', { key: 'user_id' }),
  developer: DS.attr('boolean'),
  initials: DS.attr('string'),
  name: DS.attr('string'),
  teamId: DS.attr('string'),
  intercomUserHash: DS.attr('string'),
  timeZone: DS.attr('string')
});
