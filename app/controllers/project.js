import Ember from 'ember';

export default Ember.ObjectController.extend({
  isOpen: false,
  hasAngles: Ember.computed.gt('angles.length', 0),
  isSortable: Ember.computed.equal('status', 'high'),
  initialStatus: null,

  remainingTarget: (function() {
    var targetValuesCount = this.get('targetValues').reduce(function(m, targetValue) {
      return m + targetValue;
    }, 0);

    return Math.max(0, targetValuesCount - this.get('proposedAdvisorsCount'));
  }).property('proposedAdvisorsCount', 'targetValues.[]'),

  users: (function() {
    return this.get('angleTeamMemberships').sortBy('createdAt').mapBy('teamMember').uniq();
  }).property('angleTeamMemberships.@each.{createdAt,teamMember}'),

  save: function() {
    this.saveWithErrors(this.get('model'));
  },

  setInitialStatus: function() {
    this.set('initialStatus', this.get('status'));
  },

  actions: {
    toggleOpen: function() {
      this.set('isOpen', !this.get('isOpen'));
    },

    cycleStatus: function() {
      Ember.run.debounce(this, 'setInitialStatus', 500, true);
      this.get('model').cycleStatus();
      Ember.run.debounce(this, 'save', 500);
    }
  }
});
