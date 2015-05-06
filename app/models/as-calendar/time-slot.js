import Ember from 'ember';
import Time from './time';

export default Time.extend({
  offset: moment.duration(),
  duration: Ember.computed.oneWay('calendar.timeSlotDuration'),

  endingOffset: Ember.computed('offset', 'duration', function() {
    return moment.duration(this.get('offset')).add(this.get('duration'));
  }),

  value: Ember.computed('offset', function() {
    return moment().startOf('day').add(this.get('offset'));
  })
});
