import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':profile', 'isFlipped:flipped'],
  tagName: 'article',

  person: null,
  title: null,

  mainPhoneNumber: function() {
    return this.get('person.phoneNumbers').get('firstObject');
  }.property('person.phoneNumbers'),

  isFlipped: function() {
      return this.get('flipped');
  }.property('flipped'),

  actions: {
     flip: function() {
        this.toggleProperty('flipped');
     }
  }
});
