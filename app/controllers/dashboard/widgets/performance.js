import Ember from 'ember';

export default Ember.Controller.extend({
  maxCreditCount: Ember.computed('model.monthlyTarget', function() {
    return this.get('model.monthlyTarget') * 2;
  }),

  progress: Ember.computed('model.maxCreditCount', 'model.currentMonthCreditCount', function() {
    return this.get('model.currentMonthCreditCount') / this.get('model.maxCreditCount');
  }),

  targetRatio: Ember.computed('model.monthlyTarget', 'model.maxCreditCount', function() {
    return this.get('model.monthlyTarget') / this.get('model.maxCreditCount');
  }),

  paceRatio: Ember.computed('model.onPaceCreditTarget', 'model.maxCreditCount', function() {
    return this.get('model.onPaceCreditTarget') / this.get('model.maxCreditCount');
  }),

  monthlyTargetTitle: Ember.computed('model.monthlyTarget', function() {
    return `Target: ${this.get('model.monthlyTarget')}`;
  }),

  onPaceCreditTargetTitle: Ember.computed('model.onPaceCreditTarget', function() {
    return `On Pace: ${this.get('model.onPaceCreditTarget')}`;
  }),

  currentMonthCreditCountTitle: Ember.computed('model.currentMonthCreditCount', function() {
    return `Credits: ${this.get('model.currentMonthCreditCount')}`;
  })
});
