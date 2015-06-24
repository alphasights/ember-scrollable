import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  deliveryTarget: Ember.computed('membership.deliveryTarget', {
    set: function(_, value) {
      this.set('membership.deliveryTarget', value);
      Ember.run.debounce(this, 'save', 500);

      return value;
    },

    get: function() {
      return this.get('membership.deliveryTarget');
    }
  }),

  save: function() {
    var membership = this.get('membership');

    if (membership.get('isDirty')) {
      this.get('membership').save();
    }
  },

  actions: {
    remove: function() {
      this.get('membership').destroyRecord();
    }
  }
});
