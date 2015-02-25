import Ember from 'ember';

export default Ember.ObjectController.extend({
  statusClass: function() {
    if (this.get('isOnTarget')) {
      return 'on-target';
    } else if (this.get('isOnPace')) {
      return 'on-pace';
    } else {
      return null;
    }
  }.property('isOnTarget', 'isOnPace'),

  maxCreditCount: function() {
    return this.get('monthlyTarget') * 2;
  }.property('monthlyTarget'),

  progress: function() {
    return this.get('currentMonthCreditCount') / this.get('maxCreditCount');
  }.property('maxCreditCount', 'currentMonthCreditCount'),

  targetRatio: function() {
    return this.get('monthlyTarget') / this.get('maxCreditCount');
  }.property('monthlyTarget', 'maxCreditCount'),

  paceRatio: function() {
    return this.get('onPaceCreditTarget') / this.get('maxCreditCount');
  }.property('onPaceCreditTarget', 'maxCreditCount'),

  monthlyTargetTitle: function() {
    return `Target: ${this.get('monthlyTarget')}`;
  }.property('monthlyTarget'),

  onPaceCreditTargetTitle: function() {
    return `To be on Pace: ${this.get('onPaceCreditTarget')}`;
  }.property('onPaceCreditTarget'),

  currentMonthCreditCountTitle: function() {
    return `Credits: ${this.get('currentMonthCreditCount')}`;
  }.property('currentMonthCreditCount')
});
