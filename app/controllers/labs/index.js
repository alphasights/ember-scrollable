import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),
  queryParams: {
    selectedFilter: 'selected'
  },

  selectedFilter: 'all',

  arrangedContent: Ember.computed('_myLabs', '_availableLabs', 'selectedFilter', function() {
    let selectedFilter = this.get('selectedFilter');

    if (selectedFilter === 'mine') {
      return this.get('_myLabs');
    } else if (selectedFilter === 'available') {
      return this.get('_availableLabs');
    } else {
      return this.get('_sortedLabs');
    }
  }),

  availableLabsCount: Ember.computed('_availableLabs.length', function() {
    return this.get('_availableLabs.length');
  }),

  allLabsCount: Ember.computed('_sortedLabs.length', function() {
    return this.get('_sortedLabs.length');
  }),

  myLabsCount: Ember.computed('_myLabs.length', function() {
    return this.get('_myLabs.length');
  }),

  _sortedLabs: Ember.computed('model.@each.name', function() {
    return this.get('model').rejectBy('name', undefined).sortBy('name');
  }),

  _myLabs: Ember.computed('currentUser.model.featureParticipations', function() {
    return this.get('currentUser.model.featureParticipations').mapBy('feature');
  }),

  _availableLabs: Ember.computed('_sortedLabs.@each.hasReachedLimit', '_myLabs', function() {
    return _.difference(
      this.get('_sortedLabs'), this.get('_myLabs')
    ).filterBy('hasReachedLimit', false);
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
