import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  avatarUrl: DS.attr('string'),
  companyName: DS.attr('string'),
  emails: DS.attr(),
  interactions: DS.hasMany('interaction'),
  jobTitle: DS.attr('string'),
  name: DS.attr('string'),
  phoneNumbers: DS.attr(),
  phones: DS.attr(),
  timeZone: DS.attr('string'),

  currentPosition: Ember.computed('jobTitle', 'companyName', function() {
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
  }),

  pistachioUrl: Ember.computed('id', function() {
    return `${EmberENV.pistachioUrl}/advisors/${this.get('id')}`;
  })
});
