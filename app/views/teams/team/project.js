import SidePanelView from 'phoenix/views/side-panel';
import KeyEventsMixin from 'phoenix/mixins/key-events';

export default SidePanelView.extend(KeyEventsMixin, {
  classNameBindings: [':project'],
  tagName: 'article',

  init: function() {
    this._super.apply(this, arguments);

    this.set('keyEvents', _(this.get('keyEvents')).extend({
      leftArrow: function() {
        this.get('controller').send('previous');
      },

      rightArrow: function() {
        this.get('controller').send('next');
      }
    }));
  }
});
