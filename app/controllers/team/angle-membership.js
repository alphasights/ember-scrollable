import Ember from 'ember';

export default Ember.ObjectController.extend({
  deliveryTargetDidChange: function() {
    Ember.run.debounce(this, '_deliveryTargetDidChange', 100);
  }.observes('deliveryTarget'),

  _deliveryTargetDidChange: function() {
    this.get('model').save();
  }
});
