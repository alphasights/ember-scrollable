import Ember from 'ember';

export default Ember.Controller.extend({
  deliveryTarget: Ember.computed('model.deliveryTarget', function(_, value) {
    if (arguments.length > 1) {
      this.set('model.deliveryTarget', value);
      Ember.run.debounce(this, 'save', 500);
    }

    return this.get('model.deliveryTarget');
  }),

  save: function() {
    var model = this.get('model');

    if (model.get('isDirty')) {
      this.get('model').save();
    }
  }
});
