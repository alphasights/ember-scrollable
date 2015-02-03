import DS from 'ember-data';

var ClientContact = DS.Model.extend({
  clientAccount: DS.belongsTo('clientAccount', { async: true }),
  interactions: DS.hasMany('interaction', { async: true }),
  name: DS.attr('string'),
  phoneNumbers: DS.attr()
});

ClientContact.reopenClass({
  FIXTURES: [
    {
      id: 1,
      clientAccount: 1,
      name: 'Johnny Contact One',
      phoneNumbers: ['+111111333']
    },
    {
      id: 2,
      clientAccount: 1,
      name: 'Big Popa Potato Two',
      phoneNumbers: ['+1193984938']
    }
  ]
});

export default ClientContact;
