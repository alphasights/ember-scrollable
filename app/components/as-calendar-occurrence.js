import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'article',
  classNameBindings: [':calendar-occurrence', 'type'],
  attributeBindings: ['style'],

  calendar: null,
  occurrence: null,
  duration: Ember.computed.oneWay('occurrence.duration'),
  timeSlotHeight: Ember.computed.oneWay('calendar.timeSlotHeight'),
  timeSlotDuration: Ember.computed.oneWay('calendar.timeSlotDuration'),
  type: Ember.computed.oneWay('occurrence.type'),

  occupiedTimeSlots: function() {
    return this.get('duration').as('milliseconds') /
           this.get('timeSlotDuration').as('milliseconds');
  }.property('duration'),

  style: function() {
    return `height: ${this.get('occupiedTimeSlots') * this.get('timeSlotHeight')}px;`;
  }.property('timeSlotHeight', 'occupiedTimeSlots')
});
