import DS from 'ember-data';

export default DS.Model.extend({
  clientContacts: DS.hasMany('clientContact', { async: false }),
  name: DS.attr('string')
});
