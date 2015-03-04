import Ember from 'ember';

var TimeSlotDate = Ember.Object.extend({
  day: null,
  slot: null,
  component: Ember.computed.oneWay('slot.component'),
  referenceTime: Ember.computed.oneWay('component.referenceTime'),
  time: Ember.computed.oneWay('slot.time'),

  offset: function() {
    return moment(this.get('time')).diff(this.get('referenceTime'));
  }.property('referenceTime', 'time'),

  value: function() {
    return moment(this.get('day')).add(this.get('offset'));
  }.property('day', 'offset')
});

var TimeSlot = Ember.Object.extend({
  component: null,
  time: null,
  days: Ember.computed.oneWay('component.days'),
  timeSlots: Ember.computed.oneWay('component.timeSlots'),
  headerSpan: 2,

  showHeader: function() {
    return (this.get('timeSlots').indexOf(this) % this.get('headerSpan')) === 0;
  }.property('timeSlots.[]', 'headerSpan'),

  dates: function() {
    var days = this.get('days');
    var dates = [];

    days.forEach((day) => {
      dates.pushObject(TimeSlotDate.create({
        day: day,
        slot: this
      }));
    });

    return dates;
  }.property('days.[]')
});

export default Ember.Component.extend({
  classNameBindings: [':calendar'],

  startingDate: moment().startOf('week'),
  referenceTime: moment().startOf('day'),
  value: null,

  dayStartingTime: function() {
    return moment(this.get('referenceTime')).add(7, 'hour');
  }.property('referenceTime'),

  dayEndingTime: function() {
    return moment(this.get('referenceTime')).add(22, 'hour');
  }.property('referenceTime'),

  days: function() {
    var startingDate = this.get('startingDate');
    var currentDate = startingDate;
    var days = [];

    while (currentDate.week() === startingDate.week()) {
      days.pushObject(currentDate.toDate());
      currentDate = moment(currentDate).add(1, 'day');
    }

    return days;
  }.property('startingDate'),

  timeSlots: function() {
    var currentTime = moment(this.get('dayStartingTime'));
    var timeSlots = [];

    while (currentTime.toDate() <= this.get('dayEndingTime').toDate()) {
      timeSlots.pushObject(TimeSlot.create({
        time: currentTime,
        component: this
      }));

      currentTime = moment(currentTime).add(30, 'minute');
    }

    return timeSlots;
  }.property('dayStartingTime', 'dayEndingTime'),

  actions: {
    setValue: function(value) {
      this.set('value', value);
    }
  }
});
