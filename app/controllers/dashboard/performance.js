import Ember from 'ember';

export default Ember.Controller.extend({
  weekDayHoursSinceBeginningOfMonth: function() {
    var todaysDate = moment().date();
    var dateCounter = 1;
    var weekdayHours = 0;

    while (dateCounter <= todaysDate) {
      var date = moment().date(dateCounter);

      if (date.day() != 6 || date.day() != 0) {
        if (todaysDate === dateCounter) {
          var now = moment();
          var todaysStart = moment().startOf('day');
          var duration = moment.duration(now.diff(todaysStart));
          var hours = Math.floor(duration.asHours());

          weekdayHours += hours;
        } else {
          weekdayHours += 24;
        }
      }
      dateCounter++;
    }
    return weekdayHours;
  }.property(),

  totalWeekDayHoursInCurrentMonth: function() {
    var endOfMonthDate = moment().endOf('month').date();
    var dateCounter = 1;
    var weekdayHours = 0;

    while (dateCounter <= endOfMonthDate) {
      var date = moment().date(dateCounter);

      if (date.day() != 6 || date.day() != 0) {
        weekdayHours += 24;
      }
      dateCounter++;
    }
    return weekdayHours;
  }.property(),


  monthCompletedFloat: function() {
    var hoursSince = this.get('weekDayHoursSinceBeginningOfMonth');
    var totalHours = this.get('totalWeekDayHoursInCurrentMonth');

    return Math.round((hoursSince / totalHours) * 100) / 100;
  }.property(
    'weekDayHoursSinceBeginningOfMonth', 'totalWeekDayHoursInCurrentMonth'
  ),

  targetCreditProgressFraction: function() {
    var monthCompletedFloat = this.get('monthCompletedFloat');
    var target = this.get('model.monthlyTarget');

    return target * monthCompletedFloat;
  }.property('monthCompletedFraction', 'model.monthlyTarget')
});
