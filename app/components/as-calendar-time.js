import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'article',
  classNameBindings: [':calendar-time'],
  attributeBindings: ['style'],

  timeSlot: null,
  day: null,
  calendar: null,
  timeSlotHeight: Ember.computed.oneWay('calendar.timeSlotHeight'),
  selection: Ember.computed.alias('calendar.selection'),

  click: function() {
    if (this.get('canBeSelected')) {
      this.set('selection.time', this.get('time'));
    }
  },

  style: function() {
    return `height: ${this.get('timeSlotHeight')}px;`;
  }.property('timeSlotHeight'),

  time: function() {
    return moment(this.get('day.value')).add(this.get('timeSlot.offset'));
  }.property('day.value', 'timeSlot.offset'),

  endingTime: function() {
    return moment(this.get('day.value')).add(this.get('timeSlot.endingOffset'));
  }.property('day.value', 'timeSlot.endingOffset'),

  allOccurrences: function() {
    var calendarOccurrences = this.get('calendar.occurrences');
    var selection = this.get('selection');

    if (selection != null) {
      return calendarOccurrences.concat(selection);
    } else {
      return calendarOccurrences;
    }
  }.property('calendar.occurrences.[]', 'selection'),

  occurrences: function() {
    var time = this.get('time').toDate();
    var endingTime = this.get('endingTime').toDate();

    return this.get('allOccurrences').filter((occurrence) => {
      var occurrenceTime = occurrence.get('time').toDate();
      return occurrenceTime >= time && occurrenceTime < endingTime;
    });
  }.property('time', 'endingTime', 'allOccurrences.@each.time'),

  canBeSelected: function() {
    var time = this.get('time').toDate();
    var endingTime = this.get('endingTime').toDate();

    return !this.get('calendar.occurrences').any(function(occurrence) {
      var occurrenceTime = occurrence.get('time').toDate();
      var occurrenceEndingTime = occurrence.get('endingTime').toDate();

      return (endingTime >= occurrenceTime && endingTime < occurrenceEndingTime) ||
             (time >= occurrenceTime && time < occurrenceEndingTime);
    });
  }.property('time', 'endingTime', 'calendar.occurrences.@each.{time,duration}')
});
