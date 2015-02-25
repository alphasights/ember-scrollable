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

  progress: function() {
    return this.get('currentMonthCreditCount') / this.get('monthlyTarget');
  }.property('monthlyTarget', 'currentMonthCreditCount'),

  pace: function() {
    return this.get('onPaceCreditTarget') / this.get('monthlyTarget');
  }.property('onPaceCreditTarget', 'currentMonthCreditCount'),

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
