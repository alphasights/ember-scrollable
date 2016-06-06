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
    recalculate() {
      this._recalculateTrackpadScrollEmulator();
    },
    update(value) {
      if (this._didSetup) {
        scheduleOnce('afterRender', this, this._recalculateTrackpadScrollEmulator);        
      }
      return value;
    }
  }
});