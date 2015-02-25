import Ember from 'ember';

export default Ember.ArrayController.extend({
  allVisible: false,
  initialVisibleLimit: 5,

  visibleInteractions: function() {
    if (this.get('allVisible')) {
      return this.get('model');
    } else {
      return this.get('model').slice(0, this.get('initialVisibleLimit'));
    }
  }.property('model', 'allVisible'),

  initializeAllVisible: function() {
    if (this.get('model.length') <= this.get('initialVisibleLimit')) {
      this.set('allVisible', true);
    }
  }.on('init'),

  actions: {
    makeAllVisible: function() {
      this.set('allVisible', true);
    }
  }
});
