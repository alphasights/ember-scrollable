import DS from 'ember-data';

export default DS.Model.extend({
  interactions: DS.hasMany('interaction'),
  name: DS.attr('string'),
  phoneNumbers: DS.attr()
});
