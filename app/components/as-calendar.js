import Ember from 'ember';

var TimeSlot = Ember.Object.extend({
  date: null,
  component: null,
  referenceTime: Ember.computed.oneWay('component.referenceTime'),

  offset: function() {
    return moment(this.get('date')).diff(this.get('referenceTime'));
  }.property('date', 'referenceTime')
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

  startingDay: moment().startOf('week'),
  referenceTime: moment().startOf('day'),
  value: null,

  dayStartingTime: function() {
    return moment(this.get('referenceTime')).add(7, 'hour');
  }.property('referenceTime'),

  dayEndingTime: function() {
    return moment(this.get('referenceTime'))
      .add(22, 'hour')
      .subtract(30, 'minute');
  }.property('referenceTime'),

  days: function() {
    var startingDay = this.get('startingDay');
    var currentDate = startingDay;
    var days = [];

    while (currentDate.week() === startingDay.week()) {
      days.push(Day.create({
        date: currentDate,
        component: this
      }));

      currentDate = moment(currentDate).add(1, 'day');
    }

    return days;
  }.property('startingDay'),

  timeSlots: function() {
    var currentTime = moment(this.get('dayStartingTime'));
    var timeSlots = [];

    while (currentTime.toDate() <= this.get('dayEndingTime').toDate()) {
      timeSlots.pushObject(TimeSlot.create({
        date: currentTime,
        component: this
      }));

      currentTime = moment(currentTime).add(30, 'minute');
    }

    return timeSlots;
  }.property('dayStartingTime', 'dayEndingTime'),

  headerTimeSlots: function() {
    var timeSlots = this.get('timeSlots');

    return _(timeSlots).filter(function(timeSlot) {
      return (timeSlots.indexOf(timeSlot) % 2) === 0;
    });
  }.property('timeSlots.[]'),

  actions: {
    setValue: function(value) {
      this.set('value', value);
    }
  }
});
