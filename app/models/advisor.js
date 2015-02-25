import DS from 'ember-data';

export default DS.Model.extend({
  avatarUrl: DS.attr('string'),
  companyName: DS.attr('string'),
  emails: DS.attr(),
  interactions: DS.hasMany('interaction'),
  jobTitle: DS.attr('string'),
  name: DS.attr('string'),
  phoneNumbers: DS.attr(),
  timeZone: DS.attr('string'),

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
  }.property('jobTitle', 'companyName'),

  pistachioUrl: function() {
    return `${EmberENV.pistachioUrl}/advisors/${this.get('id')}`;
  }.property('id')
});
