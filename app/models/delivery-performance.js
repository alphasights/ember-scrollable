import Ember from 'ember';
import DS from 'ember-data';
import PerformableMixin from 'phoenix/mixins/performable';

export default DS.Model.extend(PerformableMixin, {
  currentMonthCreditCount: DS.attr('number'),
  monthlyTarget: DS.attr('number'),
  unusedAdvisorsCount: DS.attr('number'),
  user: DS.belongsTo('user'),

  onPaceCreditTarget: Ember.computed('monthlyTarget', function() {
    return Math.round(
      (this.get('monthlyTarget') * this.monthCompletionProgress()
    ) * 10) / 10;
  }),

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
