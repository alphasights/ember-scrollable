import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  createdAt: DS.attr('utc'),
  avatarUrl: DS.attr('string'),
  developer: DS.attr('boolean'),
  initials: DS.attr('string'),
  name: DS.attr('string'),
  teamId: DS.attr('string'),
  intercomUserHash: DS.attr('string')
});
