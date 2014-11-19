import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':quick-jump', 'isActive:active', 'isLoading:loading'],

  isActive: false,
  isLoading: Ember.computed.alias('controller.requestPromise.isLoading'),
  placeholder: null,

  clickEventName: function() {
    return `click.${this.get('elementId')}`;
  }.property('elementId'),

  didInsertElement: function() {
    Ember.$(document).on(this.get('clickEventName'), (event) => {
      var $target = Ember.$(event.target);
      var $nonBlurringElements = Ember.$('.quick-jump .bar, .quick-jump .results');

      if ($target.closest($nonBlurringElements).length <= 0) {
        this.set('isActive', false);
      }

      return true;
    });
  },

  willDestroyElement: function() {
    Ember.$(document).off(this.get('clickEventName'));
  },

  keyUp: function(event) {
    if (event.which === 27) {
      this.set('isActive', false);
    }
  },

  onIsActiveDidChange: function() {
    if (!this.get('isActive')) {
      this.$('input').blur();
    }
  }.observes('isActive'),

  actions: {
    onBarFocusIn: function() {
      this.set('isActive', true);
    }
  }
});
