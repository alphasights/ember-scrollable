import Ember from 'ember';

export default Ember.Mixin.create({
  keyEvents: {
    leftArrow: function() {
      this.get('controller').send('previous');
    },

    rightArrow: function() {
      this.get('controller').send('next');
    }
  }
});
