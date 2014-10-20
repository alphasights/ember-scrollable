import DS from 'ember-data';

export default DS.Model.extend({
  initials: DS.attr('string'),
  name: DS.attr('string'),
  avatarUrl: DS.attr('string')
});
