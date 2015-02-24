import Ember from 'ember';

export default Ember.ObjectController.extend({
  performanceBarClass: function() {
    if (this.get('hasFulfilledTarget')) {
      return 'on-target';
    } else if (this.get('isOnPace')) {
      return 'on-pace';
    } else {
      return null;
    }
  }.property('hasFulfilledTarget', 'isOnPace'),

  progress: function() {
    return Math.min(1, this.get('currentMonthCreditCount') / this.get('monthlyTarget'));
  }.property('monthlyTarget', 'currentMonthCreditCount'),

  pace: function() {
    return Math.min(1, this.get('onPaceCreditTarget') / this.get('monthlyTarget'));
  }.property('onPaceCreditTarget', 'currentMonthCreditCount'),

  monthlyTargetTitle: function() {
    return `Target: ${this.get('monthlyTarget')}`;
  }.property('monthlyTarget'),

  onPaceCreditTargetTitle: function() {
    return `On Pace Target: ${this.get('onPaceCreditTarget')}`;
  }.property('onPaceCreditTarget'),

  currentMonthCreditCountTitle: function() {
    return `Credits: ${this.get('currentMonthCreditCount')}`;
  }.property('currentMonthCreditCount')
});
