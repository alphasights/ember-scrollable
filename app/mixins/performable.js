import Ember from 'ember';

export default Ember.Mixin.create({
  isAmazing: Ember.computed('currentMonthCreditCount', 'onPaceCreditTarget', function() {
    return (this.get('currentMonthCreditCount') / this.get('onPaceCreditTarget')) >= 2;
  }),

  isMoreThanOnPace: Ember.computed('currentMonthCreditCount', 'onPaceCreditTarget', function() {
    return (this.get('currentMonthCreditCount') / this.get('onPaceCreditTarget')) >= 1.5;
  }),

  isOnPace: Ember.computed('currentMonthCreditCount', 'onPaceCreditTarget', function() {
    return this.get('currentMonthCreditCount') >= this.get('onPaceCreditTarget');
  }),
})
