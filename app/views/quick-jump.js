import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':quick-jump', 'isActive:active', 'isLoading:loading'],
  isActive: false,
  templateName: 'quick-jump',
  placeholder: null,
  isLoading: Ember.computed.alias('controller.requestPromise.isLoading'),

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

  actions: {
    onBarFocusIn: function() {
      this.set('isActive', true);
    }
  }
});
