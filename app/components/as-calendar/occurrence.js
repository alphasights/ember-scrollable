import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'article',
  classNameBindings: [':calendar-occurrence', 'occurrence.type'],
  attributeBindings: ['style'],

  calendar: null,
  occurrence: null,
  timeSlotHeight: Ember.computed.oneWay('calendar.timeSlotHeight'),
  timeSlotDuration: Ember.computed.oneWay('calendar.timeSlotDuration'),

  occupiedTimeSlots: function() {
    return this.get('occurrence.duration').as('milliseconds') /
           this.get('timeSlotDuration').as('milliseconds');
  }.property('occurrence.duration'),

  style: function() {
    return `height: ${this.get('occupiedTimeSlots') * this.get('timeSlotHeight')}px;`;
  }.property('timeSlotHeight', 'occupiedTimeSlots')
});
