import DS from 'ember-data';

export default DS.Model.extend({
  avatarUrl: DS.attr('string'),
  emails: DS.attr()
  name: DS.attr('string'),
  phoneNumbers: DS.attr(),
});
