import Ember from 'ember';

export default Ember.ObjectController.extend({
  remainingTarget: (function() {
    var targetValuesCount = this.get('targetValues').reduce(function(m, targetValue) {
      return m + targetValue;
    }, 0);

    return Math.max(0, targetValuesCount - this.get('proposedAdvisorsCount'));
  }).property('proposedAdvisorsCount', 'targetValues.[]'),

  users: (function() {
    return this.get('angleTeamMemberships').sortBy('createdAt').mapBy('teamMember').uniq();
  }).property('angleTeamMemberships.@each.{createdAt,teamMember}')
});
