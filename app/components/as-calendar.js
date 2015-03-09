import Ember from 'ember';
import TimeZoneOption from 'phoenix/models/as-calendar/time-zone-option';

var Time = Ember.Object.extend({
  calendar: null,
  value: null,
  timeZone: Ember.computed.oneWay('calendar.timeZone'),

  localValue: function() {
    var timeZone = this.get('timeZone');
    var value = this.get('value');

    if (timeZone != null) {
      return moment(value).tz(timeZone);
    } else {
      return value;
    }
  }.property('value', 'timeZone')
});

var TimeSlot = Time.extend({
  offset: moment.duration(),
  duration: Ember.computed.oneWay('calendar.timeSlotDuration'),

  endingOffset: function() {
    return moment.duration(this.get('offset')).add(this.get('duration'));
  }.property('offset', 'duration'),

  value: function() {
    return moment().startOf('day').add(this.get('offset'));
  }.property('offset')
});

var Day = Time.extend({
  offset: 0,
  startingDate: Ember.computed.oneWay('calendar.startingDate'),

  value: function() {
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
  occurrences: [],
  timeZoneOptions: [],
  timeZone: null,
  selection: null,

  selectedTimeZoneOption: function() {
    return this.get('allTimeZoneOptions').findBy('value', this.get('timeZone'));
  }.property('timeZone', 'allTimeZoneOptions.@each.value'),

  systemTimeZoneAbbreviation: function() {
    return new Date().toString().split(' ').slice(-1)[0].slice(1, -1);
  }.property(),

  allTimeZoneOptions: function() {
    var systemTimeZoneAbbreviation = this.get('systemTimeZoneAbbreviation');

    return [TimeZoneOption.create({
      title: 'System Time Zone',
      abbreviation: systemTimeZoneAbbreviation
    })].concat(this.get('timeZoneOptions'));
  }.property('timeZoneOptions.[]', 'systemTimeZoneAbbreviation'),

  days: function() {
    return _.range(this.get('numberOfDays')).map((offset) => {
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

  timeSlotsHeaderStyle: function() {
    return `margin-top: -${this.get('timeSlotHeight') / 2}px;`;
  }.property('timeSlotHeight'),

  dayStyle: function() {
    return `width: ${100 / this.get('days.length')}%;`;
  }.property('days.length'),

  headerTimeSlotStyle: function() {
    return `height: ${2 * this.get('timeSlotHeight')}px;`;
  }.property('timeSlotHeight')
});
