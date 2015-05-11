import Ember from 'ember';

export default Ember.Controller.extend({
  maxCreditCount: Ember.computed('model.monthlyTarget', function() {
    return this.get('model.monthlyTarget') * 2;
  }),

  progress: Ember.computed('maxCreditCount', 'model.currentMonthCreditCount', function() {
    return this.get('model.currentMonthCreditCount') / this.get('maxCreditCount');
  }),

  targetRatio: Ember.computed('model.monthlyTarget', 'maxCreditCount', function() {
    debugger
    return this.get('model.monthlyTarget') / this.get('maxCreditCount');
  }),

  paceRatio: Ember.computed('model.onPaceCreditTarget', 'maxCreditCount', function() {
    return this.get('model.onPaceCreditTarget') / this.get('maxCreditCount');
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
