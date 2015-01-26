import SidePanelView from 'phoenix/views/side-panel';

export default SidePanelView.extend({
  classNameBindings: [':project'],
  tagName: 'article',

  keyEvents: {
    leftArrow: function() {
      this.get('controller').send('previous');
    },

    rightArrow: function() {
      this.get('controller').send('next');
    }
  }
});
