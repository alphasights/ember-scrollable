import Ember from 'ember';

var TimeSlot = Ember.Object.extend({
  time: null,
  component: null,
  referenceTime: Ember.computed.oneWay('component.referenceTime'),

  offset: function() {
    return moment(this.get('time')).diff(this.get('referenceTime'));
  }.property('time', 'referenceTime')
});

var Day = Ember.Object.extend({
  date: null,
  component: null,
  timeSlots: Ember.computed.oneWay('component.timeSlots'),

  times: function() {
    var times = [];

    this.get('timeSlots').forEach((timeSlot) => {
      times.push(moment(this.get('date')).add(timeSlot.get('offset')));
    });

    return times;
  }.property('date', 'timeSlots.@each.offset')
});

export default Ember.Component.extend({
  tagName: 'section',
  classNameBindings: [':calendar'],

  startingDate: moment().startOf('week'),
  referenceTime: moment().startOf('day'),
  value: null,
  timeSlotDuration: moment.duration(30, 'minute'),

  occurrences: function() {
    if (this.get('value') != null) {
      return [Ember.Object.create({
        type: 'interaction',
        time: moment(this.get('value')),
        title: 'Interaction'
      })];
    } else {
      return [];
    }
  }.property('value'),

  dayStartingTime: function() {
    return moment(this.get('referenceTime')).add(7, 'hour');
  }.property('referenceTime'),

  dayEndingTime: function() {
    return moment(this.get('referenceTime'))
      .add(22, 'hour')
      .subtract(30, 'minute');
  }.property('referenceTime'),

  days: function() {
    var startingDate = this.get('startingDate');
    var currentDate = startingDate;
    var days = [];

    while (currentDate.week() === startingDate.week()) {
      days.push(Day.create({
        date: currentDate,
        component: this
      }));

      currentDate = moment(currentDate).add(1, 'day');
    }

    return days;
  }.property('startingDate'),

  timeSlots: function() {
    var currentTime = this.get('dayStartingTime');
    var timeSlots = [];

    while (currentTime.toDate() <= this.get('dayEndingTime').toDate()) {
      timeSlots.pushObject(TimeSlot.create({
        time: currentTime,
        component: this
      }));

      currentTime = moment(currentTime).add(this.get('timeSlotDuration'));
    }

    return timeSlots;
  }.property('dayStartingTime', 'dayEndingTime', 'timeSlotDuration'),

  headerTimeSlots: function() {
    var timeSlots = this.get('timeSlots');

    return _(timeSlots).filter(function(timeSlot) {
      return (timeSlots.indexOf(timeSlot) % 2) === 0;
    });
  }.property('timeSlots.[]'),

  dayStyle: function() {
    return `width: ${100 / this.get('days.length')}%;`;
  }.property('days.length')
});
