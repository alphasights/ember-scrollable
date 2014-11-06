import Ember from 'ember';

export default Ember.ObjectController.extend({
  progress: function() {
    return this.get('proposedAdvisorsCount') / Math.max(1, this.get('totalTarget'));
  }.property('proposedAdvisorsCount', 'totalTarget'),

  actions: {
    setPriority: function(value) {
      this.set('priority', value);
      this.get('model').save();
    }
  }
});
