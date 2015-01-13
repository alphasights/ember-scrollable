import Ember from 'ember';

var keyCodeToEventMap = {
  27: 'esc',
  37: 'leftArrow',
  39: 'rightArrow'
};

export default Ember.Mixin.create({
  setupArrowKeysHandling: function() {
    this.$(document).on(`keyup.${this.get('elementId')}`, (event) => {
      var key = keyCodeToEventMap[event.keyCode];
      var keyEvent = this.keyEvents[key];

      if (keyEvent) {
        keyEvent.apply(this);
      }
    });
  }.on('didInsertElement'),

  tearDownArrowKeysHandling: function() {
    this.$(document).off(`keyup.${this.get('elementId')}`);
  }.on('willDestroyElement')
});
