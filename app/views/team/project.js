import SidePanelView from '../side-panel';
import KeyEventsMixin from '../../mixins/key-events';

export default SidePanelView.extend(KeyEventsMixin, {
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
