import SidePanelView from '../side-panel';

export default SidePanelView.extend({
  classNameBindings: [':project'],
  tagName: 'article',

  setupArrowKeysHandling: function() {
    this.$(document).on('keyup.projectNavigation', this.arrowKeysHandler.bind(this));
  }.on('didInsertElement'),

  removeArrowKeysHandling: function() {
    this.$(document).off('keyup.projectNavigation');
  }.on('willDestroyElement'),

  arrowKeysHandler: function(e) {
    if (e.keyCode === 37) { this.get('controller').send('previous'); } // left arrow
    if (e.keyCode === 39) { this.get('controller').send('next'); } // right arrow
  }
});
