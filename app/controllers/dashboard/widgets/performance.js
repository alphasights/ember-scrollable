import Ember from 'ember';

export default Ember.ObjectController.extend({
  maxCreditCount: Ember.computed('monthlyTarget', function() {
    return this.get('monthlyTarget') * 2;
  }),

  progress: Ember.computed('maxCreditCount', 'currentMonthCreditCount', function() {
    return this.get('currentMonthCreditCount') / this.get('maxCreditCount');
  }),

  targetRatio: Ember.computed('monthlyTarget', 'maxCreditCount', function() {
    return this.get('monthlyTarget') / this.get('maxCreditCount');
  }),

  paceRatio: Ember.computed('onPaceCreditTarget', 'maxCreditCount', function() {
    return this.get('onPaceCreditTarget') / this.get('maxCreditCount');
  }),

  monthlyTargetTitle: Ember.computed('monthlyTarget', function() {
    return `Target: ${this.get('monthlyTarget')}`;
  }),

  onPaceCreditTargetTitle: Ember.computed('onPaceCreditTarget', function() {
    return `On Pace: ${this.get('onPaceCreditTarget')}`;
  }),

  currentMonthCreditCountTitle: Ember.computed('currentMonthCreditCount', function() {
    return `Credits: ${this.get('currentMonthCreditCount')}`;
  })
});
