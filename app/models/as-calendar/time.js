import Ember from 'ember';

export default Ember.Object.extend({
  calendar: null,
  value: null,
  timeZone: Ember.computed.oneWay('calendar.timeZone'),

  localValue: Ember.computed('value', 'timeZone', function() {
    var timeZone = this.get('timeZone');
    var value = this.get('value');

    if (timeZone != null) {
      return moment(value).tz(timeZone);
    } else {
      return value;
    }
  })
});
