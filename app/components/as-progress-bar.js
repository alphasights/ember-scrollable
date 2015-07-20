import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':progress-bar'],

  style: Ember.computed('ratio', function() {
    return `width: ${Math.min(1, this.get('ratio')) * 100}%`.htmlSafe();
  })
});
