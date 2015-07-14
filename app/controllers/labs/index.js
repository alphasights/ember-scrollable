import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),

  sortedFeatures: Ember.computed('model.[]', function() {
    return this.get('model').toArray().sort(function(a, b) {
      return -Ember.compare(a.get('version'), b.get('version'));
    });
  }),

  actions: {
    destroyParticipation: function(participation) {
      participation.destroyRecord();
    },

    createParticipation: function(feature) {
      this.store.createRecord('featureParticipation', {
        feature: feature, user: this.get('currentUser.model')
      }).save();
    }
  }
});
