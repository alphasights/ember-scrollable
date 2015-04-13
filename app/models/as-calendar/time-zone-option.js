import Ember from 'ember';
import timeZoneAbbreviation from 'phoenix/helpers/time-zone-abbreviation';

export default Ember.Object.extend({
  title: null,
  value: null,

  abbreviation: function() {
    return timeZoneAbbreviation(new Date(), this.get('value'));
  }.property('value'),

  description: function() {
    return `${this.get('title')} (${this.get('abbreviation')})`;
  }.property('title', 'abbreviation')
});
