import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':profile', 'isFlipped:flipped'],
  tagName: 'article',

  person: null,
  title: null,

  primaryPhone: Ember.computed('person.phones.[]', function() {
    return this.get('person.phones').findBy('primary', true);
  }),

  isFlipped: Ember.computed('flipped', function() {
    return this.get('flipped');
  }),

  actions: {
    flip: function() {
      this.toggleProperty('flipped');
    }
  }
});
