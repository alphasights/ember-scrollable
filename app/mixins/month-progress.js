import Ember from 'ember';

export default Ember.Mixin.create({
  monthCompletionProgress: function() {
    return this._weekdayHoursSinceBeginningOfMonth() /
      this._totalWeekdayHoursInCurrentMonth();
  },

  _weekdayHoursSinceBeginningOfMonth: function() {
    var yesterdaysDate = moment().date() - 1;

    return this._numberOfWeekdayHoursUntil(yesterdaysDate) +
      this._hoursSinceTodaysStart();
  },

  _totalWeekdayHoursInCurrentMonth: function() {
    return this._numberOfWeekdayHoursUntil(moment().endOf('month').date());
  },

  _numberOfWeekdayHoursUntil: function(endDate) {
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

  _hoursSinceTodaysStart: function() {
    var todaysStart = moment().startOf('day');
    var timeSinceTodaysStart = moment.duration(moment().diff(todaysStart));

    return Math.round(timeSinceTodaysStart.asHours());
  }
});
