import Ember from 'ember';

export default Ember.ArrayController.extend({
  isShowingAll: false,
  initialVisibleLimit: 4,

  visibleInteractions: function() {
    if (this.get('isShowingAll')) {
      return this.get('model');
    } else {
      return this.get('model').slice(0, this.get('initialVisibleLimit'));
    }
  }.property('model', 'isShowingAll'),

  canShowMoreInteractions: function() {
    return this.get('visibleInteractions.length') < this.get('model.length');
  }.property('model.length', 'visibleInteractions.length'),

  actions: {
    showMore: function() {
      this.set('isShowingAll', true);
    },

    showLess: function() {
      this.set('isShowingAll', false);
    }
  }
});
