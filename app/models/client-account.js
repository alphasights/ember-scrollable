import DS from 'ember-data';

export default DS.Model.extend({
  clientContacts: DS.hasMany('clientContact'),
  name: DS.attr('string')
});
