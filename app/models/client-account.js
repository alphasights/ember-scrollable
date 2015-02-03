import DS from 'ember-data';

var ClientAccount = DS.Model.extend({
  clientContacts: DS.hasMany('clientContact', { async: true }),
  name: DS.attr('string')
});

ClientAccount.reopenClass({
  FIXTURES: [
    { id: 1, name: 'Big Bad Industries' }
  ]
});

export default ClientAccount;
