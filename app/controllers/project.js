import Ember from 'ember';

export default Ember.ObjectController.extend({
  progress: function() {
    var deliveryTarget = this.get('deliveryTarget');

    if (deliveryTarget === 0) {
      return 0;
    } else {
      return this.get('deliveredAdvisorsCount') / deliveryTarget;
    }
  }.property('deliveredAdvisorsCount', 'deliveryTarget'),

  actions: {
    setPriority: function(value) {
      this.set('priority', value);
      this.get('model').save();
    }
  }
});
