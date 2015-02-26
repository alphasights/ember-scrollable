import Ember from 'ember';

export default Ember.ArrayController.extend({
  showMore: false,
  initialVisibleLimit: 4,

  visibleInteractions: function() {
    if (this.get('showMore')) {
      return this.get('model');
    } else {
      return this.get('model').slice(0, this.get('initialVisibleLimit'));
    }
  }.property('model', 'showMore'),

  canShowMoreInteractions: function() {
    return this.get('visibleInteractions.length') < this.get('model.length')
  }.property('model.length', 'visibleInteractions.length'),

  actions: {
    showMore: function() {
      this.set('showMore', true);
    },

    showLess: function() {
      this.set('showMore', false);
    }
  }
});
