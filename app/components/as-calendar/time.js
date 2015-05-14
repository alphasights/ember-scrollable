import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'article',
  classNameBindings: [':calendar-time'],
  attributeBindings: ['style'],

  timeSlot: null,
  day: null,
  calendar: null,
  timeSlotHeight: Ember.computed.oneWay('calendar.timeSlotHeight'),
  selection: Ember.computed.alias('calendar.selection'),
  timeSlots: Ember.computed.oneWay('calendar.timeSlots'),

  click: function() {
    if (this.get('canBeSelected')) {
      this.set('selection.time', this.get('time'));
    }
  },

  style: Ember.computed('timeSlotHeight', function() {
    return `height: ${this.get('timeSlotHeight')}px;`.htmlSafe();
  }),

  time: Ember.computed('day.value', 'timeSlot.offset', function() {
    return moment(this.get('day.value')).add(this.get('timeSlot.offset'));
  }),

  endingTime: Ember.computed('day.value', 'timeSlot.endingOffset', function() {
    return moment(this.get('day.value')).add(this.get('timeSlot.endingOffset'));
  }),

  lastTimeSlotEndingTime: Ember.computed('day.value', 'timeSlots.lastObject.endingOffset', function() {
    return moment(this.get('day.value'))
             .add(this.get('timeSlots.lastObject.endingOffset'));
  }),

  allOccurrences: Ember.computed('calendar.occurrences.[]', 'selection.time', function() {
    var calendarOccurrences = this.get('calendar.occurrences');
    var selection = this.get('selection');
    var selectionTime = selection.get('time');

    if (selectionTime != null) {
      return calendarOccurrences.concat(selection);
    } else {
      return calendarOccurrences;
    }
  }),

  occurrences: Ember.computed('time', 'endingTime', 'allOccurrences.@each.time', function() {
    var time = this.get('time').toDate();
    var endingTime = this.get('endingTime').toDate();

    return this.get('allOccurrences').filter((occurrence) => {
      var occurrenceTime = occurrence.get('time').toDate();
      return occurrenceTime >= time && occurrenceTime < endingTime;
    });
  }),

  isBlockedByAnyOccurrence: Ember.computed(
    'time',
    'endingTime',
    'calendar.occurrences.@each.{time,duration}',
    function() {
      var time = this.get('time').toDate();
      var endingTime = this.get('endingTime').toDate();

      return this.get('calendar.occurrences').any(function(occurrence) {
        var occurrenceTime = occurrence.get('time').toDate();
        var occurrenceEndingTime = occurrence.get('endingTime').toDate();

        return (endingTime >= occurrenceTime && endingTime < occurrenceEndingTime) ||
               (time >= occurrenceTime && time < occurrenceEndingTime);
      });
    }
  ),

  isInsideCalendar: Ember.computed('endingTime', 'lastTimeSlotEndingTime', function() {
    return this.get('endingTime').toDate() <
           this.get('lastTimeSlotEndingTime').toDate();
  }),

  canBeSelected: Ember.computed('isInsideCalendar', 'isBlockedByAnyOccurrence', function() {
    return this.get('isInsideCalendar') && !this.get('isBlockedByAnyOccurrence');
  })
});
