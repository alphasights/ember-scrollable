import Ember from 'ember';
import PerformableMixin from 'phoenix/mixins/performable';

export default Ember.Object.extend(PerformableMixin, {
  userPerformances: null,

  monthlyTarget: Ember.computed('userPerformances.[]', function() {
    return this._totalize('monthlyTarget');
  }),

  currentMonthCreditCount: Ember.computed('userPerformances.[]', function() {
    return this._totalize('currentMonthCreditCount');
  }),

  onPaceCreditTarget: Ember.computed('userPerformances.[]', function() {
    var totalTarget = this._totalize('onPaceCreditTarget');
    return Math.round(totalTarget * 10) / 10;
  }),

  _totalize: function(attribute) {
    return _.reduce(this.get('userPerformances'), function(sum, performance) {
      return sum + performance.get(attribute);
    }, 0);
  }
});
