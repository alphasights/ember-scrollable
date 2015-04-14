import Ember from 'ember';
import TimeZoneOption from 'phoenix/models/as-calendar/time-zone-option';
import timeZoneAbbreviation from 'phoenix/helpers/time-zone-abbreviation';

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

var startOfCurrentWeek = moment().startOf('week');

export default Ember.Component.extend({
  tagName: 'section',
  classNameBindings: [':calendar'],

  numberOfDays: 7,
  timeSlotsRange: [moment.duration('7:00'), moment.duration('21:30')],
  timeSlotDuration: moment.duration(30, 'minute'),
  timeSlotHeight: 30,
  occurrences: [],
  timeZoneOptions: [],
  timeZone: null,
  selection: null,
  startingDate: null,

  scrollToSelection: function() {
    Ember.run.scheduleOnce('afterRender', () => {
      var selection = this.$('.calendar-occurrence').toArray().find((occurrence) => {
        return Ember.View.views[Ember.$(occurrence).prop('id')].get('occurrence') ===
               this.get('selection');
      });

      if (selection != null) {
        var container = this.$('> div');
        container.scrollTop(Ember.$(selection).offset().top - container.offset().top);
      }
    });
  }.on('didInsertElement'),

  initializeStartingDate: function() {
    var selectionTime = this.get('selection.time');

    if (selectionTime != null) {
      this.set('startingDate', moment(selectionTime).startOf('week'));
    } else {
      this.set('startingDate', startOfCurrentWeek);
    }
  }.on('init'),

  isShowingCurrentWeek: function() {
    return moment(this.get('startingDate')).startOf('week').isSame(startOfCurrentWeek);
  }.property('startingDate'),

  selectedTimeZoneOption: function() {
    return this.get('allTimeZoneOptions').findBy('value', this.get('timeZone'));
  }.property('timeZone', 'allTimeZoneOptions.@each.value'),

  allTimeZoneOptions: function() {
    return [TimeZoneOption.create({
      title: 'Your Time Zone',
      abbreviation: timeZoneAbbreviation(new Date())
    })].concat(this.get('timeZoneOptions'));
  }.property('timeZoneOptions.[]'),

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
    return `margin-top: -${this.get('timeSlotHeight') / 2}px;`.htmlSafe();
  }.property('timeSlotHeight'),

  dayStyle: function() {
    return `width: ${100 / this.get('days.length')}%;`.htmlSafe();
  }.property('days.length'),

  headerTimeSlotStyle: function() {
    return `height: ${2 * this.get('timeSlotHeight')}px;`.htmlSafe();
  }.property('timeSlotHeight'),

  actions: {
    navigateWeek: function(index) {
      this.set('startingDate', moment(this.get('startingDate')).add(index, 'week'));
    },

    goToCurrentWeek: function() {
      this.set('startingDate', startOfCurrentWeek);
    }
  }
});
