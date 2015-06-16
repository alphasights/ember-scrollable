import Ember from 'ember';

export default Ember.Object.extend({
  userPerformances: null,

  monthlyTarget: Ember.computed('userPerformances.[]', function() {
    return this._totalize('monthlyTarget');
  }),

  roundedCurrentMonthCreditCount: Ember.computed('userPerformances.[]', function() {
    return Math.floor(this._totalize('currentMonthCreditCount'));
  }),

  onPaceCreditTarget: Ember.computed('userPerformances.[]', function() {
    var totalTarget = this._totalize('onPaceCreditTarget');
    return Math.round(totalTarget * 10) / 10;
  }),

  isOnTarget: Ember.computed('roundedCurrentMonthCreditCount', 'monthlyTarget', function() {
    return this.get('roundedCurrentMonthCreditCount') >= this.get('monthlyTarget');
  }),

  isOnPace: Ember.computed('roundedCurrentMonthCreditCount', 'onPaceCreditTarget', function() {
    return this.get('roundedCurrentMonthCreditCount') >= this.get('onPaceCreditTarget');
  }),

  _totalize: function(attribute) {
    return _.reduce(this.get('userPerformances'), function(sum, performance) {
      return sum + performance.get(attribute);
    }, 0);
  }
});
