import DS from 'ember-data';

export default DS.Model.extend({
  avatarUrl: DS.attr('string'),
  clientAccount: DS.belongsTo('clientAccount'),
  emails: DS.attr(),
  interactions: DS.hasMany('interaction'),
  name: DS.attr('string'),
  phoneNumbers: DS.attr(),

  currentPosition: Ember.computed.alias('clientAccount.name')
});
