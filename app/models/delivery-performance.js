import Ember from 'ember';
import DS from 'ember-data';
import MonthProgressMixin from 'phoenix/mixins/month-progress';

export default DS.Model.extend(MonthProgressMixin, {
  currentMonthCreditCount: DS.attr('number'),
  monthlyTarget: DS.attr('number'),
  user: DS.belongsTo('user'),

  onPaceCreditTarget: Ember.computed('monthlyTarget', function() {
    return Math.round(
      (this.get('monthlyTarget') * this.monthCompletionProgress()
    ) * 10) / 10;
  }),

  isOnTarget: Ember.computed('currentMonthCreditCount', 'monthlyTarget', function() {
    return this.get('currentMonthCreditCount') >= this.get('monthlyTarget');
  }),

  isOnPace: Ember.computed('currentMonthCreditCount', 'onPaceCreditTarget', function() {
    return this.get('currentMonthCreditCount') >= this.get('onPaceCreditTarget');
  })
});
