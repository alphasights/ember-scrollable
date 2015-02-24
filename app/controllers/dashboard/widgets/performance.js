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
  }.property('monthlyTarget', 'currentMonthCreditCount')
});
