import DS from 'ember-data';

var Advisor = DS.Model.extend({
  avatarUrl: DS.attr('string'),
  emails: DS.attr(),
  interactions: DS.hasMany('interaction', { async: true }),
  name: DS.attr('string'),
  phoneNumbers: DS.attr()
});

Advisor.reopenClass({
  FIXTURES: [
    {
      id: 1,
      avatarUrl: 'http://www.fillmurray.com/120/120',
      emails: ['billmurray@email.com'],
      name: 'Bill Murray',
      phoneNumbers: ['+123456789']
    },
    { id: 2,
      avatarUrl: 'https://placekitten.com/120/120',
      emails: ['kitty_von_meow39@email.com'],
      name: 'Kitty Von Meow',
      phoneNumbers: ['+198765432']
    }
  ]
});

export default Advisor;
