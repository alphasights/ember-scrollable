import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  text: null,
  characterLimit: 40,
  tooltipPosition: 'top',

  isTextAbridged: Ember.computed('text', 'characterLimit', function() {
    return this.get('text').length > this.get('characterLimit');
  }),

  abridgedText: Ember.computed('text', 'characterLimit', function() {
    return `${this.get('text').slice(0, this.get('characterLimit'))}...`;
  })
});
