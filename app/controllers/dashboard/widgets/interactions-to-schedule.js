import Ember from 'ember';

export default Ember.ArrayController.extend({
  isShowingAll: false,
  initiallyVisibleNumberOfItems: 4,

  arrangedContent: function() {
    if (this.get('isShowingAll')) {
      return this.get('model');
    } else {
      return this.get('model').slice(0, this.get('initiallyVisibleNumberOfItems'));
    }
  }.property('model.[]', 'isShowingAll'),

  totalLength: function() {
    return this.get('model.length');
  }.property('model.length'),

  canShowMore: function() {
    return this.get('arrangedContent.length') < this.get('model.length');
  }.property('model.length', 'arrangedContent.length'),

  isShowingMore: function() {
    return (this.get('arrangedContent.length') > this.get('initiallyVisibleNumberOfItems'));
  }.property('arrangedContent.length'),

  actions: {
    showMore: function() {
      this.set('isShowingAll', true);
    },

    showLess: function() {
      this.set('isShowingAll', false);
    }
  }
});
