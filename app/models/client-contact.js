import DS from 'ember-data';

export default DS.Model.extend({
  avatarUrl: DS.attr('string'),
  clientAccount: DS.belongsTo('clientAccount', { async: true }),
  emails: DS.attr(),
  interactions: DS.hasMany('interaction', { async: true }),
  name: DS.attr('string'),
  phoneNumbers: DS.attr()
});
