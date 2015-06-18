import Ember from 'ember';

export default Ember.Mixin.create({
  paceIsExceptional: Ember.computed('currentMonthCreditCount', 'onPaceCreditTarget', function() {
    return (this.get('currentMonthCreditCount') / this.get('onPaceCreditTarget')) >= 2.5;
  }),

  isMoreThanOnPace: Ember.computed('currentMonthCreditCount', 'onPaceCreditTarget', function() {
    return (this.get('currentMonthCreditCount') / this.get('onPaceCreditTarget')) >= 1.5;
  }),

  isOnPace: Ember.computed('currentMonthCreditCount', 'onPaceCreditTarget', function() {
    return this.get('currentMonthCreditCount') >= this.get('onPaceCreditTarget');
  }),
});
