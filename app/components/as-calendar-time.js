import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'article',
  classNameBindings: [':calendar-time'],

  time: null,
  calendar: null,
  timeSlotDuration: Ember.computed.oneWay('calendar.timeSlotDuration'),

  click: function() {
    this.set('calendar.value', this.get('time').toDate());
  },

  endingTime: function() {
    return moment(this.get('time')).add(this.get('timeSlotDuration'));
  }.property('time', 'timeSlotDuration'),

  occurrences: function() {
    var time = this.get('time').toDate();
    var endingTime = this.get('endingTime').toDate();

    return this.get('calendar.occurrences').filter((occurrence) => {
      var occurrenceTime = occurrence.get('time').toDate();
      return occurrenceTime >= time && occurrenceTime < endingTime;
    });
  }.property('time', 'calendar.occurrences', 'timeSlotDuration')
});
