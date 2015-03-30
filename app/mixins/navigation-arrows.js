import Ember from 'ember';

export default Ember.Mixin.create({
  keyEvents: {
    leftArrow: function() {
      this.sendAction('previous');
    },

    rightArrow: function() {
      this.sendAction('next');
    }
  }
});
