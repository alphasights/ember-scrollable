import Ember from 'ember';

export default Ember.ObjectController.extend({
  progress: function() {
    var totalTarget = this.get('totalTarget');

    if (totalTarget === 0) {
      return 0;
    } else {
      return Math.min(1, this.get('proposedAdvisorsCount') / totalTarget);
    }
  }.property('proposedAdvisorsCount', 'totalTarget'),

  actions: {
    setPriority: function(value) {
      this.set('priority', value);
      this.get('model').save();
    }
  }
});
