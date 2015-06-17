import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':progress-bar'],

  width: Ember.computed('ratio', function() {
    return `${Math.min(1, this.get('ratio')) * 100}%`.htmlSafe();
  })
});
