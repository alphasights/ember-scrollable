import Ember from 'ember';

export default Ember.View.extend({
  classNameBindings: [':count', 'isRelevant:relevant'],

  isRelevant: function() {
    return this.get('controller.model') > 0;
  }.property('controller.model')
});
