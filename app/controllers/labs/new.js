import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createFeature: function() {
      this.get('featureForm').save();
    }
  }
});
