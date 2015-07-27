import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  queryParams: {
    selectedFilter: 'selected'
  },

  selectedFilter: 'all',

  arrangedContent: Ember.computed('myLabs', 'availableLabs', 'selectedFilter', function() {
    let selectedFilter = this.get('selectedFilter');

    if (selectedFilter === 'mine') {
      return this.get('myLabs');
    } else if (selectedFilter === 'available') {
      return this.get('availableLabs');
    } else {
      return this.get('sortedLabs');
    }
  }),

  sortedLabs: Ember.computed('model.@each.name', function() {
    return this.get('model').rejectBy('isDirty', true).sortBy('name');
  }),

  myLabs: Ember.computed('currentUser.model.featureParticipations', function() {
    return this.get('currentUser.model.featureParticipations').mapBy('feature');
  }),

  availableLabs: Ember.computed('sortedLabs.@each.hasReachedLimit', 'myLabs', function() {
    return _.difference(
      this.get('sortedLabs'), this.get('myLabs')
    ).filterBy('hasReachedLimit', false);
  }),

  actions: {
    destroyParticipation: function(participation) {
      participation.get('feature').decrementProperty('featureParticipationsCount');

      participation.destroyRecord().catch(function() {
        participation.rollback();
        participation.transitionTo('loaded.saved');
        participation.get('feature').rollback();
      });
    },

    createParticipation: function(feature) {
      feature.incrementProperty('featureParticipationsCount');

      let featureParticipation = this.store.createRecord('featureParticipation', {
        feature: feature, user: this.get('currentUser.model')
      });

      featureParticipation.save().catch(function() {
        featureParticipation.destroy();
        feature.rollback();
      });
    }
  }
});
