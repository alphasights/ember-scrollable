import DS from 'ember-data';

var Advisor = DS.Model.extend({
  avatarUrl: DS.attr('string'),
  companyName: DS.attr('string'),
  emails: DS.attr(),
  interactions: DS.hasMany('interaction', { async: true }),
  jobTitle: DS.attr('string'),
  name: DS.attr('string'),
  phoneNumbers: DS.attr(),

  currentPosition: function() {
    var jobTitle = this.get('jobTitle');
    var companyName = this.get('companyName');

    if (jobTitle && companyName) {
      return `${jobTitle} at ${companyName}`;
    } else if (jobTitle) {
      return jobTitle;
    } else if (companyName) {
      return companyName;
    } else {
      return '';
    }
  }.property('jobTitle', 'companyName')
});

Advisor.reopenClass({
  FIXTURES: [
    {
      id: 1,
      avatarUrl: 'http://www.fillmurray.com/120/120',
      companyName: 'Ghostbusters INC.',
      emails: ['billmurray@email.com'],
      jobTitle: 'Ghostbuster',
      name: 'Bill Murray',
      phoneNumbers: ['+123456789']
    },
    { id: 2,
      avatarUrl: 'https://placekitten.com/120/120',
      companyName: 'Meow Mix Industries',
      emails: ['kitty_von_meow39@email.com'],
      jobTitle: 'Chief Happiness Officer',
      name: 'Kitty Von Meow',
      phoneNumbers: ['+198765432']
    }
  ]
});

export default Advisor;
