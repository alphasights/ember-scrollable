import Ember from 'ember';

var Occurrence = Ember.Object.extend({
  calendar: null,
  type: null,
  time: null,
  title: null,
  duration: 1,
  timeSlotHeight: Ember.computed.oneWay('calendar.timeSlotHeight'),

  style: function() {
    return `height: ${this.get('duration') * this.get('timeSlotHeight')}px;`;
  }.property('duration', 'timeSlotHeight')
});

var TimeSlot = Ember.Object.extend({
  offset: moment.duration(),
  calendar: null,
  duration: Ember.computed.oneWay('calendar.timeSlotDuration'),

  endingOffset: function() {
    return moment.duration(this.get('offset')).add(this.get('duration'));
  }.property('offset', 'duration'),

  time: function() {
    return moment().startOf('day').add(this.get('offset'));
  }.property('offset')
});

var Day = Ember.Object.extend({
  offset: moment.duration(),
  calendar: null,
  startingDate: Ember.computed.oneWay('calendar.startingDate'),

  date: function() {
    return moment(this.get('startingDate')).add(this.get('offset'), 'day');
  }.property('startingDate', 'offset')
});

export default Ember.Component.extend({
  tagName: 'section',
  classNameBindings: [':calendar'],

  startingDate: moment().startOf('week'),
  numberOfDays: 7,
  timeSlotsRange: [moment.duration('7:00'), moment.duration('21:30')],
  timeSlotDuration: moment.duration(30, 'minute'),
  timeSlotHeight: 30,

  value: null,

  occurrences: function() {
    if (this.get('value') != null) {
      return [Occurrence.create({
        calendar: this,
        type: 'interaction',
        time: moment(this.get('value')),
        title: 'Interaction',
        duration: 2
      })];
    } else {
      return [];
    }
  }.property('value'),

  days: function() {
    return _.range(this.get('numberOfDays')).map(function(offset) {
      return Day.create({
        offset: offset,
        calendar: this
      });
    });
  }.property('numberOfDays'),

  timeSlots: function() {
    var timeSlotsRange = this.get('timeSlotsRange');
    var currentOffset = timeSlotsRange[0];
    var timeSlots = [];

    while (currentOffset.as('milliseconds') <= timeSlotsRange[1].as('milliseconds')) {
      var timeSlot = TimeSlot.create({
        offset: currentOffset,
        calendar: this
      });

      timeSlots.push(timeSlot);
      currentOffset = timeSlot.get('endingOffset');
    }

    return timeSlots;
  }.property('timeSlotsRange.[]'),

  headerTimeSlots: function() {
    var timeSlots = this.get('timeSlots');

    return _(timeSlots).filter(function(timeSlot) {
      return (timeSlots.indexOf(timeSlot) % 2) === 0;
    });
  }.property('timeSlots.[]'),

  dayStyle: function() {
    return `width: ${100 / this.get('days.length')}%;`;
  }.property('days.length'),

  headerTimeSlotStyle: function() {
    return `height: ${2 * this.get('timeSlotHeight')}px;`;
  }.property('timeSlotHeight')
});
