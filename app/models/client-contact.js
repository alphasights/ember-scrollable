import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  avatarUrl: DS.attr('string'),
  clientAccount: DS.belongsTo('clientAccount'),
  emails: DS.attr(),
  interactions: DS.hasMany('interaction'),
  name: DS.attr('string'),
  phoneNumbers: DS.attr(),
  _phoneNumbers: DS.attr(),
  timeZone: DS.attr('string'),

  currentPosition: Ember.computed.alias('clientAccount.name'),

  pistachioUrl: Ember.computed('id', function() {
    return `${EmberENV.pistachioUrl}/client/contacts/${this.get('id')}`;
  })
});
