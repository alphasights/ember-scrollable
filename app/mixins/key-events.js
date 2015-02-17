import Ember from 'ember';

const keyCodeToEventMap = {
  27: 'esc',
  37: 'leftArrow',
  39: 'rightArrow'
};

export default Ember.Mixin.create({
  mergedProperties: ['keyEvents'],
  keyEvents: {},

  setupKeyHandling: function() {
    this.$(document).on(`keyup.${this.get('elementId')}`, (event) => {
      var key = keyCodeToEventMap[event.keyCode];
      var keyEvent = this.get('keyEvents')[key];

      if (keyEvent) {
        keyEvent.apply(this);
      }
    });
  }.on('didInsertElement'),

  tearDownKeyHandling: function() {
    this.$(document).off(`keyup.${this.get('elementId')}`);
  }.on('willDestroyElement')
});
