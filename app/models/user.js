import DS from 'ember-data';

export default DS.Model.extend({
  avatarUrl: DS.attr('string'),
  developer: DS.attr('boolean'),
  initials: DS.attr('string'),
  name: DS.attr('string'),
  teamId: DS.attr('string')
});
