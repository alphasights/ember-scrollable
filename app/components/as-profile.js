import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':profile', 'isFlipped:flipped'],
  tagName: 'article',

  person: null,
  title: null,

  primaryPhone: function() {
    var phone = this.get('person._phoneNumbers').filter((phone) => {
      return phone.primary === true;
    });

    return phone.get('firstObject');
  }.property('person._phoneNumbers'),

  isFlipped: function() {
    return this.get('flipped');
  }.property('flipped'),

  actions: {
     flip: function() {
        this.toggleProperty('flipped');
     }
  }
});
