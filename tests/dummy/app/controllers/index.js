import Ember from 'ember';

export default Ember.Controller.extend({
  verticalShowMore: false,
  horizontalShowMore: false,

  actions: {
    toggleVerticalShowMore: function() {
      this.toggleProperty('verticalShowMore');
    },

    toggleHorizontalShowMore: function() {
      this.toggleProperty('horizontalShowMore');
    }
  }
});
