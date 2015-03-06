import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'article',
  classNameBindings: [':calendar-time'],
  attributeBindings: ['style'],

  timeSlot: null,
  day: null,
  calendar: null,
  timeSlotHeight: Ember.computed.oneWay('calendar.timeSlotHeight'),

  style: function() {
    return `height: ${this.get('timeSlotHeight')}px;`;
  }.property('timeSlotHeight'),

  time: function() {
    return moment(this.get('day.date')).add(this.get('timeSlot.offset'));
  }.property('day.date', 'timeSlot.offset'),

  endingTime: function() {
    return moment(this.get('day.date')).add(this.get('timeSlot.endingOffset'));
  }.property('day.date', 'timeSlot.endingOffset'),

  click: function() {
    this.set('calendar.value', this.get('time').toDate());
  },

  occurrences: function() {
    var time = this.get('time').toDate();
    var endingTime = this.get('endingTime').toDate();

    return this.get('calendar.occurrences').filter((occurrence) => {
      var occurrenceTime = occurrence.get('time').toDate();
      return occurrenceTime >= time && occurrenceTime < endingTime;
    });
  }.property('time', 'endingTime', 'calendar.occurrences.@each.time')
});
