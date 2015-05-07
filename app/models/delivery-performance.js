import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  currentMonthCreditCount: DS.attr('number'),
  monthlyTarget: DS.attr('number'),
  user: DS.belongsTo('user'),
  team: DS.belongsTo('team'),

  onPaceCreditTarget: Ember.computed('monthlyTarget', function() {
    return Math.round(
      (this.get('monthlyTarget') * this.monthCompletionProgress()
    ) * 10) / 10;
  }),

  weekdayHoursSinceBeginningOfMonth: function() {
    var yesterdaysDate = moment().date() - 1;

    return this.numberOfWeekdayHoursUntil(yesterdaysDate) +
      this.hoursSinceTodaysStart();
  },

  totalWeekdayHoursInCurrentMonth: function() {
    return this.numberOfWeekdayHoursUntil(moment().endOf('month').date());
  },

  monthCompletionProgress: function() {
    return this.weekdayHoursSinceBeginningOfMonth() /
      this.totalWeekdayHoursInCurrentMonth();
  },

  numberOfWeekdayHoursUntil: function(endDate) {
    return _.range(1, endDate)
      .map(function(day) { return moment().date(day); })
      .reduce(function(memo, date) {
        if (date.day() === 6 || date.day() === 0) {
          return memo;
        } else {
          return memo += 24;
        }
      }, 0);
  },

  hoursSinceTodaysStart: function() {
    var todaysStart = moment().startOf('day');
    var timeSinceTodaysStart = moment.duration(moment().diff(todaysStart));

    return Math.round(timeSinceTodaysStart.asHours());
  },

  isOnTarget: Ember.computed('currentMonthCreditCount', 'monthlyTarget', function() {
    return this.get('currentMonthCreditCount') >= this.get('monthlyTarget');
  }),

  isOnPace: Ember.computed('currentMonthCreditCount', 'onPaceCreditTarget', function() {
    return this.get('currentMonthCreditCount') >= this.get('onPaceCreditTarget');
  })
});
