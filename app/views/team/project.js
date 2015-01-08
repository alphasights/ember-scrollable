import SidePanelView from '../side-panel';

export default SidePanelView.extend({
  classNameBindings: [':project'],
  tagName: 'article',

  setupArrowKeysHandling: function() {
    this.$(document).on('keyup.projectNavigation', (e) => {
      if (e.keyCode === 37) { this.get('controller').send('previous'); } // left arrow
      if (e.keyCode === 39) { this.get('controller').send('next'); } // right arrow
    });
  }.on('didInsertElement'),

  removeArrowKeysHandling: function() {
    this.$(document).off('keyup.projectNavigation');
  }.on('willDestroyElement')
});
