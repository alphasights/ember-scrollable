import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNameBindings: [':calendar-time-zone-option', 'isSelected:selected'],

  timeZoneOption: null,
  calendar: null,
  selectedTimeZoneOption: Ember.computed.oneWay('calendar.selectedTimeZoneOption'),
  timeZone: Ember.computed.alias('calendar.timeZone'),

  isSelected: function() {
    return this.get('timeZoneOption') === this.get('selectedTimeZoneOption');
  }.property('timeZoneOption', 'selectedTimeZoneOption'),

  click: function() {
    this.set('timeZone', this.get('timeZoneOption.value'));
  }
});
