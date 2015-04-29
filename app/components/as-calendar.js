import Ember from 'ember';
import TimeZoneOption from 'phoenix/models/as-calendar/time-zone-option';
import timeZoneAbbreviation from 'phoenix/helpers/time-zone-abbreviation';

var Time = Ember.Object.extend({
  calendar: null,
  value: null,
  timeZone: Ember.computed.oneWay('calendar.timeZone'),

  localValue: Ember.computed('value', 'timeZone', function() {
    var timeZone = this.get('timeZone');
    var value = this.get('value');

    if (timeZone != null) {
      return moment(value).tz(timeZone);
    } else {
      return value;
    }
  })
});

var TimeSlot = Time.extend({
  offset: moment.duration(),
  duration: Ember.computed.oneWay('calendar.timeSlotDuration'),

  endingOffset: Ember.computed('offset', 'duration', function() {
    return moment.duration(this.get('offset')).add(this.get('duration'));
  }),

  value: Ember.computed('offset', function() {
    return moment().startOf('day').add(this.get('offset'));
  })
});

var Day = Time.extend({
  offset: 0,
  startingDate: Ember.computed.oneWay('calendar.startingDate'),

  value: Ember.computed('startingDate', 'offset', function() {
    return moment(this.get('startingDate')).add(this.get('offset'), 'day');
  })
});

var startOfCurrentWeek = moment().startOf('week');

export default Ember.Component.extend({
  tagName: 'section',
  classNameBindings: [':calendar'],

  numberOfDays: 7,
  timeSlotsRange: [moment.duration('7:00'), moment.duration('21:30')],
  timeSlotDuration: moment.duration(30, 'minute'),
  timeSlotHeight: 20,
  occurrences: [],
  timeZoneOptions: [],
  timeZone: null,
  selection: null,
  startingDate: null,

  scrollToSelection: Ember.on('didInsertElement', function() {
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
  }),

  initializeStartingDate: Ember.on('init', function() {
    var selectionTime = this.get('selection.time');

    if (selectionTime != null) {
      this.set('startingDate', moment(selectionTime).startOf('week'));
    } else {
      this.set('startingDate', startOfCurrentWeek);
    }
  }),

  isShowingCurrentWeek: Ember.computed('startingDate', function() {
    return moment(this.get('startingDate')).startOf('week').isSame(startOfCurrentWeek);
  }),

  selectedTimeZoneOption: Ember.computed('timeZone', 'allTimeZoneOptions.@each.value', function() {
    return this.get('allTimeZoneOptions').findBy('value', this.get('timeZone'));
  }),

  allTimeZoneOptions: Ember.computed('timeZoneOptions.[]', function() {
    return [TimeZoneOption.create({
      title: 'Your Time Zone',
      abbreviation: timeZoneAbbreviation(new Date())
    })].concat(this.get('timeZoneOptions'));
  }),

  days: Ember.computed('numberOfDays', function() {
    return _.range(this.get('numberOfDays')).map((offset) => {
      return Day.create({
        offset: offset,
        calendar: this
      });
    });
  }),

  timeSlots: Ember.computed('timeSlotsRange.[]', function() {
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
  }),

  headerTimeSlots: Ember.computed('timeSlots.[]', function() {
    var timeSlots = this.get('timeSlots');

    return _(timeSlots).filter(function(timeSlot) {
      return (timeSlots.indexOf(timeSlot) % 2) === 0;
    });
  }),

  timeSlotsHeaderStyle: Ember.computed('timeSlotHeight', function() {
    var height = this.get('timeSlotHeight');

    return (`margin-top: -${height}px; line-height: ${height * 2}px`).htmlSafe();
  }),

  dayStyle: Ember.computed('days.length', function() {
    return `width: ${100 / this.get('days.length')}%;`.htmlSafe();
  }),

  headerTimeSlotStyle: Ember.computed('timeSlotHeight', function() {
    return `height: ${2 * this.get('timeSlotHeight')}px;`.htmlSafe();
  }),

  actions: {
    navigateWeek: function(index) {
      this.set('startingDate', moment(this.get('startingDate')).add(index, 'week'));
    },

    goToCurrentWeek: function() {
      this.set('startingDate', startOfCurrentWeek);
    }
  }
});
