import Ember from 'ember';

var SlotDate = Ember.Object.extend({
  day: null,
  slot: null,
  component: Ember.computed.oneWay('slot.component'),
  prototypeDay: Ember.computed.oneWay('component.prototypeDay'),

  offset: function() {
    return moment(this.get('slot.time')).diff(this.get('prototypeDay'));
  }.property('prototypeDay', 'slot.time'),

  value: function() {
    return moment(this.get('day')).add(this.get('offset'));
  }.property('day', 'offset')
});

var Slot = Ember.Object.extend({
  time: null,
  component: null,
  days: Ember.computed.oneWay('component.days'),

  dates: function() {
    var days = this.get('days');
    var dates = [];

    days.forEach(function(day) {
      dates.pushObject(SlotDate.create({
        day: day,
        slot: this
      }));
    });
  }.property('time')
});

export default Ember.Component.extend({
  classNameBindings: [':calendar'],

  date: moment(),
  value: null,
  prototypeDay: moment().startOf('day'),

  startOfDay: function() {
    return moment(this.get('prototypeDay')).add(9, 'hour');
  }.property('prototypeDay'),

  endOfDay: function() {
    return moment(this.get('startOfDay')).add(9, 'hour');
  }.property('startOfDay'),

  days: function() {
    var date = this.get('date');
    var currentDate = moment(date).startOf('week');
    var days = [];

    while (currentDate.week() === date.week()) {
      days.pushObject(currentDate.toDate());
      currentDate = moment(currentDate).add(1, 'day');
    }

    return days;
  }.property('date'),

  slots: function() {
    var prototypeDay = this.get('prototypeDay');
    var currentTime = moment(prototypeDay).add(this.get('startOfDay'));
    var slots = [];

    while (currentTime.toDate() <= this.get('endOfDay').toDate()) {
      slots.pushObject(Slot.create({
        time: currentTime,
        component: this
      }));

      currentTime = moment(currentTime).add(1, 'hour');
    }

    return slots;
  }.property('prototypeDay'),

  actions: {
    setValue: function(value) {
      this.set('value', value);
    }
  }
});
