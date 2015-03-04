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

  dates: function() {
    var days = this.get('days');
    var dates = [];

    days.forEach(function(day) {
      dates.pushObject(TimeSlotDate.create({
        day: day,
        slot: this
      }));
    });
  }.property('days.[]')
});

export default Ember.Component.extend({
  classNameBindings: [':calendar'],

  startingDate: moment().startOf('week'),
  referenceTime: moment().startOf('day'),
  value: null,

  startingTime: function() {
    return moment(this.get('referenceTime')).add(9, 'hour');
  }.property('referenceTime'),

  endingTime: function() {
    return moment(this.get('referenceTime')).add(18, 'hour');
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
    var currentTime = moment(this.get('startingTime'));
    var timeSlots = [];

    while (currentTime.toDate() <= this.get('endingTime').toDate()) {
      timeSlots.pushObject(TimeSlot.create({
        time: currentTime,
        component: this
      }));

      currentTime = moment(currentTime).add(1, 'hour');
    }

    return timeSlots;
  }.property('startingTime', 'endingTime'),

  actions: {
    setValue: function(value) {
      this.set('value', value);
    }
  }
});
