import Ember from 'ember';

const {
  run: { scheduleOnce, bind, debounce }
} = Ember;

export default Ember.Mixin.create({
  classNameBindings: [':as-scrollable', ':tse-scrollable', 'horizontal'],

  horizontal: false,
  autoHide: true,
  scrollBuffer: 50,

  didInsertElement() {
    this._super(...arguments);
    
    scheduleOnce('afterRender', this, this._setupTrackpadScrollEmulator);      
  },

  willDestroyElement() {
    this._super(...arguments);
    
    this._destroyTrackpadScrollEmulator();
  },

  sendScrollEnd() {
    this.sendAction('scrollEnd');
  },

  _setupTrackpadScrollEmulator() {
    this.$().TrackpadScrollEmulator({ 
      wrapContent: false, 
      autoHide: this.get('autoHide'),
      onScrollEnd: bind(this, this._onScrollEnd),
      scrollBuffer: this.get('scrollBuffer')
    });
    this._didSetup = true;
  },

  _destroyTrackpadScrollEmulator() {
    this.$().TrackpadScrollEmulator('destroy');    
  },
  
  _onScrollEnd() {
    debounce(this, this.sendScrollEnd, 1000, true);
  },
  
  _recalculateTrackpadScrollEmulator() {
    this.$().TrackpadScrollEmulator('recalculate');
  },
  
  actions: {
    
    /**
     * Recalculate action should be called when size of the scroll area changes
     */
    recalculate() {
      this._recalculateTrackpadScrollEmulator();
    },

    /**
     * Can be called when scrollbars changes as a result of value change, 
     * 
     * for example
     * ```
     * {{#as-scrollable as |scrollbars|}}
     *   {{#each (compute (pipe scrollbars.update) rows) as |row|}}
     *     {{row.title}}
     *   {{/each}}
     * {{/as-scrollable}}
     * ```
     */
    update(value) {
      if (this._didSetup) {
        scheduleOnce('afterRender', this, this._recalculateTrackpadScrollEmulator);        
      }
      return value;
    }
  }
});