import DS from 'ember-data';

export default DS.Model.extend({
  avatarUrl: DS.attr('string'),
  emails: DS.attr(),
  interactions: DS.hasMany('interaction'),
  name: DS.attr('string'),
  phoneNumbers: DS.attr()
});
