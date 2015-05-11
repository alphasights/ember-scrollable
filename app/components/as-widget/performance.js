import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNameBindings: [':widget', ':performance', 'statusClass'],

  performance: null,
  isOnTarget: Ember.computed.oneWay('performance.isOnTarget'),
  isOnPace: Ember.computed.oneWay('performance.isOnPace'),

  statusClass: Ember.computed('isOnTarget', 'isOnPace', function() {
    if (this.get('isOnTarget')) {
      return 'on-target';
    } else if (this.get('isOnPace')) {
      return 'on-pace';
    } else {
      return null;
    }
  }),

  setupTooltipster: Ember.on('didInsertElement', function() {
    Ember.run.schedule('afterRender', () => {
      this.$().hover(() => {
        this.$('.tooltipstered').tooltipster('show');
      }, () => {
        this.$('.tooltipstered').tooltipster('hide');
      });
    });
  }),

  maxCreditCount: Ember.computed('performance.monthlyTarget', function() {
    return this.get('performance.monthlyTarget') * 2;
  }),

  progress: Ember.computed('maxCreditCount', 'performance.currentMonthCreditCount', function() {
    return this.get('performance.currentMonthCreditCount') / this.get('maxCreditCount');
  }),

  targetRatio: Ember.computed('performance.monthlyTarget', 'maxCreditCount', function() {
    return this.get('performance.monthlyTarget') / this.get('maxCreditCount');
  }),

  paceRatio: Ember.computed('performance.onPaceCreditTarget', 'maxCreditCount', function() {
    return this.get('performance.onPaceCreditTarget') / this.get('maxCreditCount');
  }),

  monthlyTargetTitle: Ember.computed('performance.monthlyTarget', function() {
    return `Target: ${this.get('performance.monthlyTarget')}`;
  }),

  onPaceCreditTargetTitle: Ember.computed('performance.onPaceCreditTarget', function() {
    return `On Pace: ${this.get('performance.onPaceCreditTarget')}`;
  }),

  currentMonthCreditCountTitle: Ember.computed('performance.currentMonthCreditCount', function() {
    return `Credits: ${this.get('performance.currentMonthCreditCount')}`;
  })
});
