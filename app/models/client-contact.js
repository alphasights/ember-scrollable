import DS from 'ember-data';

export default DS.Model.extend({
  clientAccount: DS.belongsTo('clientAccount'),
  interactions: DS.hasMany('interaction'),
  name: DS.attr('string'),
  phoneNumbers: DS.attr()
});
