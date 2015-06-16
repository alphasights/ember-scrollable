import Ember from 'ember';

export default Ember.Object.extend({
  userPerformances: null,

  monthlyTarget: Ember.computed('userPerformances.[]', function() {
    return this._totalize('monthlyTarget');
  }),

  currentMonthCreditCount: Ember.computed('userPerformances.[]', function() {
    return this._totalize('currentMonthCreditCount');
  }),

  roundedCurrentMonthCreditCount: Ember.computed('currentMonthCreditCount', function() {
    return Math.floor(this.get('currentMonthCreditCount'));
  }),

  onPaceCreditTarget: Ember.computed('userPerformances.[]', function() {
    var totalTarget = this._totalize('onPaceCreditTarget');
    return Math.round(totalTarget * 10) / 10;
  }),

  isOnTarget: Ember.computed('currentMonthCreditCount', 'monthlyTarget', function() {
    return this.get('currentMonthCreditCount') >= this.get('monthlyTarget');
  }),

  isOnPace: Ember.computed('currentMonthCreditCount', 'onPaceCreditTarget', function() {
    return this.get('currentMonthCreditCount') >= this.get('onPaceCreditTarget');
  }),

  _totalize: function(attribute) {
    return _.reduce(this.get('userPerformances'), function(sum, performance) {
      return sum + performance.get(attribute);
    }, 0);
  }
});
