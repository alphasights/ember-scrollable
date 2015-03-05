import Ember from 'ember';

var Time = Ember.Object.extend({
  value: null,
  component: null,
  referenceTime: Ember.computed.oneWay('component.referenceTime'),

  offset: function() {
    return moment(this.get('value')).diff(this.get('referenceTime'));
  }.property('referenceTime', 'value')
});

var Day = Ember.Object.extend({
  value: null,
  component: null,
  times: Ember.computed.oneWay('component.times'),

  dates: function() {
    var dates = [];

    this.get('times').forEach((time) => {
      dates.pushObject(moment(this.get('value')).add(time.get('offset')));
    });

    return dates;
  }.property('value', 'times.@each.offset')
});

export default Ember.Component.extend({
  tagName: 'section',
  classNameBindings: [':calendar'],

  startingDate: moment().startOf('week'),
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
    var startingDate = this.get('startingDate');
    var currentDate = startingDate;
    var days = [];

    while (currentDate.week() === startingDate.week()) {
      days.pushObject(Day.create({
        value: currentDate.toDate(),
        component: this
      }));

      currentDate = moment(currentDate).add(1, 'day');
    }

    return days;
  }.property('startingDate'),

  times: function() {
    var currentTime = moment(this.get('dayStartingTime'));
    var times = [];

    while (currentTime.toDate() <= this.get('dayEndingTime').toDate()) {
      times.pushObject(Time.create({
        value: currentTime.toDate(),
        component: this
      }));

      currentTime = moment(currentTime).add(30, 'minute');
    }

    return times;
  }.property('dayStartingTime', 'dayEndingTime'),

  headerTimes: function() {
    var times = this.get('times');

    return _(times).filter(function(time) {
      return (times.indexOf(time) % 2) === 0;
    });
  }.property('times.[]'),

  actions: {
    setValue: function(value) {
      this.set('value', value);
    }
  }
});
