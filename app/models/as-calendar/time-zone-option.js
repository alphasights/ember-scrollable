import Ember from 'ember';
import timeZoneAbbreviation from 'phoenix/helpers/time-zone-abbreviation';

export default Ember.Object.extend({
  title: null,
  value: null,

  abbreviation: Ember.computed('value', function() {
    return timeZoneAbbreviation(new Date(), this.get('value'));
  }),

  description: Ember.computed('title', 'abbreviation', function() {
    return `${this.get('title')} (${this.get('abbreviation')})`;
  })
});
