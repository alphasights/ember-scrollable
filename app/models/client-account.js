import DS from 'ember-data';

export default DS.Model.extend({
  clientContacts: DS.hasMany('clientContact', { async: true }),
  name: DS.attr('string')
});
