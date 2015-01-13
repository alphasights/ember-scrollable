import Ember from 'ember';

var ESC = 27;
var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;

export default Ember.Mixin.create({
  setupArrowKeysHandling: function() {
    this.$(document).on(`keyup.${this.get('elementId')}`, (event) => {
      if (event.keyCode === LEFT_ARROW && this.keyEvents.leftArrow) {
        this.keyEvents.leftArrow.apply(this);
      } else if (event.keyCode === RIGHT_ARROW && this.keyEvents.rightArrow) {
        this.keyEvents.rightArrow.apply(this);
      } else if (event.keyCode === ESC && this.keyEvents.esc) {
        this.keyEvents.esc.apply(this);
      }
    });
  }.on('didInsertElement'),

  tearDownArrowKeysHandling: function() {
    this.$(document).off(`keyup.${this.get('elementId')}`);
  }.on('willDestroyElement')
});
