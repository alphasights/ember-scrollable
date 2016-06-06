import Ember from 'ember';

const {
  run: { scheduleOnce }
} = Ember;

export default Ember.Mixin.create({
  classNameBindings: [':as-scrollable', ':tse-scrollable', 'horizontal'],

  horizontal: false,
  autoHide: true,

  didInsertElement() {
    this._super(...arguments);
    
    scheduleOnce('afterRender', this, this._setupTrackpadScrollEmulator);      
  },

  willDestroyElement() {
    this._super(...arguments);
    
    this._destroyTrackpadScrollEmulator();
  },

  _setupTrackpadScrollEmulator() {
     this.$().TrackpadScrollEmulator({ wrapContent: false, autoHide: this.get('autoHide') });
  },

  _destroyTrackpadScrollEmulator() {
    this.$().TrackpadScrollEmulator('destroy');    
  },
  
  actions: {
    recalculate() {
      this.$().TrackpadScrollEmulator('recalculate');
    }
  }
});