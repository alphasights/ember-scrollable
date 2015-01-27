import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':project-progress'],

  progress: function() {
    var targetCount = this.get('targetCount');

    if (targetCount === 0) {
      return 0;
    } else {
      return this.get('deliveredCount') / targetCount;
    }
  }.property('deliveredCount', 'targetCount'),
});
