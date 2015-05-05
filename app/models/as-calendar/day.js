import Ember from 'ember';
import Time from './time';

export default Time.extend({
  offset: 0,
  startingDate: Ember.computed.oneWay('calendar.startingDate'),
  occurrences: Ember.computed.oneWay('calendar.occurrences'),

  value: Ember.computed('startingDate', 'offset', function() {
    return moment(this.get('startingDate')).add(this.get('offset'), 'day');
  }),

  serializedValue: Ember.computed('value', function() {
    return moment(this.get('value')).format('YYYY,M,D');
  }),

  occurrence: Ember.computed('occurrences.@each.day', 'serializedValue', function() {
    return this.get('occurrences').find((occurrence) => {
      return occurrence.get('day') === this.get('serializedValue');
    });
  }),

  isSelected: Ember.computed('occurrence', function() {
    return this.get('occurrence') != null;
  })
});
