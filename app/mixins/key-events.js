import Ember from 'ember';

var mapping = {
  esc: 27,
  leftArrow: 37,
  rightArrow: 39
};

var invertedMapping = _(mapping).invert();

export default Ember.Mixin.create({
  setupArrowKeysHandling: function() {
    this.$(document).on(`keyup.${this.get('elementId')}`, (event) => {
      var key = invertedMapping[event.keyCode];
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
