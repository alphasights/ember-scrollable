import Ember from 'ember';

export default Ember.ObjectController.extend({
  maxCreditCount: function() {
    return this.get('monthlyTarget') * 2;
  }.property('monthlyTarget'),

  progress: function() {
    return this.get('currentMonthCreditCount') / this.get('maxCreditCount');
  }.property('maxCreditCount', 'currentMonthCreditCount'),

  targetRatio: function() {
    return this.get('monthlyTarget') / this.get('maxCreditCount');
  }.property('monthlyTarget', 'maxCreditCount'),

  paceRatio: function() {
    return this.get('onPaceCreditTarget') / this.get('maxCreditCount');
  }.property('onPaceCreditTarget', 'maxCreditCount'),

  monthlyTargetTitle: function() {
    return `Target: ${this.get('monthlyTarget')}`;
  }.property('monthlyTarget'),

  onPaceCreditTargetTitle: function() {
    return `On Pace: ${this.get('onPaceCreditTarget')}`;
  }.property('onPaceCreditTarget'),

  currentMonthCreditCountTitle: function() {
    return `Credits: ${this.get('currentMonthCreditCount')}`;
  }.property('currentMonthCreditCount')
});
