import Ember from 'ember';

export default Ember.Controller.extend({
  hasFulfilledTarget: Ember.computed.gte('currentMonthCreditCount', 'monthlyTarget'),
  isOnPace: Ember.computed.gte('currentMonthCreditCount', 'onPaceCreditTarget'),

  weekDayHoursSinceBeginningOfMonth: function() {
    var weekdayHours = 0;
    var todaysDate = moment().date();

    for (var dateCounter = 1; dateCounter <= todaysDate; dateCounter++) {
      var date = moment().date(dateCounter);

      if (date.day() !== 6 || date.day() !== 0) {
        if (todaysDate === dateCounter) {
          var now = moment();
          var todaysStart = moment().startOf('day');
          var timeSinceTodaysStart = moment.duration(now.diff(todaysStart));

          weekdayHours += Math.floor(timeSinceTodaysStart.asHours());
        } else {
          weekdayHours += 24;
        }
      }
    }
    return weekdayHours;
  }.property(),

  totalWeekDayHoursInCurrentMonth: function() {
    var weekdayHours = 0;
    var endOfMonthDate = moment().endOf('month').date();

    for (var dateCounter = 1; dateCounter <= endOfMonthDate; dateCounter++) {
      var date = moment().date(dateCounter);

      if (date.day() !== 6 || date.day() !== 0) {
        weekdayHours += 24;
      }
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

  onPaceCreditTarget: function() {
    var monthCompletedFloat = this.get('monthCompletedFloat');
    var target = this.get('model.monthlyTarget');

    return target * monthCompletedFloat;
  }.property('monthCompletedFloat', 'model.monthlyTarget')
});
