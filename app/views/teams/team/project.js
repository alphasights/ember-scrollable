import SidePanelView from 'phoenix/views/side-panel';

var LEFT_ARROW_KEY = 37;
var RIGHT_ARROW_KEY = 39;

export default SidePanelView.extend({
  classNameBindings: [':project'],
  tagName: 'article',

  setupArrowKeysHandling: function() {
    this.$(document).on(`keyup.${this.get('elementId')}`, (event) => {
      switch (event.keyCode) {
        case LEFT_ARROW_KEY:
          this.get('controller').send('previous');
          break;
        case RIGHT_ARROW_KEY:
          this.get('controller').send('next');
          break;
      }
    });
  }.on('didInsertElement'),

  removeArrowKeysHandling: function() {
    this.$(document).off(`keyup.${this.get('elementId')}`);
  }.on('willDestroyElement')
});
