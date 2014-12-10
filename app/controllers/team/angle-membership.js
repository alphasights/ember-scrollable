import Ember from 'ember';

export default Ember.ObjectController.extend({
  deliveryTarget: function(_, value) {
    if (arguments.length > 1) {
      this.set('model.deliveryTarget', value);
      Ember.run.debounce(this, 'save', 100);
    }

    return this.get('model.deliveryTarget');
  }.property('model.deliveryTarget'),

  save: function() {
    this.get('model').save();
  }
});
