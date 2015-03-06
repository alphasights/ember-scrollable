import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'article',
  classNameBindings: [':calendar-occurrence', 'type'],
  attributeBindings: ['style'],

  calendar: null,
  occurrence: null,
  duration: Ember.computed.oneWay('occurrence.duration'),
  timeSlotHeight: Ember.computed.oneWay('calendar.timeSlotHeight'),
  type: Ember.computed.oneWay('occurrence.type'),

  style: function() {
    return `height: ${this.get('duration') * this.get('timeSlotHeight')}px;`;
  }.property('timeSlotHeight')
});
