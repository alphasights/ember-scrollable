import DS from 'ember-data';

export default DS.Model.extend({
  currentMonthCreditCount: DS.attr('number'),
  monthlyTarget: DS.attr('number'),
  user: DS.belongsTo('user'),
  hasFulfilledTarget: Ember.computed.gte('currentMonthCreditCount', 'monthlyTarget'),
  isOnPace: Ember.computed.gte('currentMonthCreditCount', 'onPaceCreditTarget'),

  onPaceCreditTarget: function() {
    return Math.round(
      (this.get('monthlyTarget') * this.monthCompletionProgress()
    ) * 10) / 10;
  }.property('monthlyTarget'),

  weekDayHoursSinceBeginningOfMonth: function() {
    var yesterdaysDate = moment().date() - 1;

    return this.numberOfWeekdayHoursUntil(yesterdaysDate)
      + this.hoursSinceTodaysStart();
  },

  totalWeekDayHoursInCurrentMonth: function() {
    return this.numberOfWeekdayHoursUntil(moment().endOf('month').date());
  },

  monthCompletionProgress: function() {
    return this.weekDayHoursSinceBeginningOfMonth()
      / this.totalWeekDayHoursInCurrentMonth();
  },

  numberOfWeekdayHoursUntil: function(endDate) {
    return _.range(1, endDate)
      .map(function(day) { return moment().date(day); })
      .reduce(function(memo, date) {
        if (date.day() !== 6 || date.day() !== 0) {
          return memo += 24;
        }
      }, 0);
  },

  hoursSinceTodaysStart: function() {
    var todaysStart = moment().startOf('day');
    var timeSinceTodaysStart = moment.duration(moment().diff(todaysStart));

    return Math.round(timeSinceTodaysStart.asHours());
  }
});
