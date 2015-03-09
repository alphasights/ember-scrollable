import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNameBindings: [':calendar-time-zone-option', 'isSelected:selected'],

  value: null,
  calendar: null,
  selectedTimeZoneOption: Ember.computed.alias('calendar.selectedTimeZoneOption'),

  isSelected: function() {
    return this.get('value') === this.get('selectedTimeZoneOption');
  }.property('value', 'selectedTimeZoneOption'),

  click: function() {
    this.set('selectedTimeZoneOption', this.get('value'));
  }
});
