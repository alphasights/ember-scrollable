import Ember from 'ember';
import {module, test} from 'qunit';
import MonthProgressMixin from 'phoenix/mixins/month-progress';

QUnit.module('MonthProgressMixin', {
  beforeEach: function() {
    Timecop.install();

    var monthProgressObject = Ember.Object.extend(MonthProgressMixin);
    this.subject = monthProgressObject.create();
  },

  afterEach: function() {
    Timecop.uninstall();
  }
});

test('#_weekdayHoursSinceBeginningOfMonth calculates weekday hours including previous hours of the current day', function(assert) {
  // February 1, 7, 8 were weekend days. leaving five full weekdays.
  // The current day, February 9, was a Monday and 12 hours had passed.
  Timecop.freeze(moment('2015-02-09T12:00:00.000+00:00'));
  var weekdayHours = (5 * 24) + 12;

  assert.equal(this.subject._weekdayHoursSinceBeginningOfMonth(), weekdayHours);
});

test('#_totalWeekdayHoursInCurrentMonth calculates the number of weekday hours in the current month', function(assert) {
  // There are 20 weekdays in the month of February.
  // http://www.wolframalpha.com/input/?i=number+of+weekdays+in+February+2015
  Timecop.freeze(moment('2015-02-20T12:00:00.000+00:00'));
  var weekdayHoursInMonth = 20 * 24;

  assert.equal(this.subject._totalWeekdayHoursInCurrentMonth(), weekdayHoursInMonth);
});

test('#monthCompletionProgress calculates how far along the month has completed', function(assert) {
  // Five weekdays prior to February 8 of a possible total of 20 weekdays.
  Timecop.freeze(moment('2015-02-08T00:00:00.000+00:00'));
  var monthProgress = (5 * 24) / (20 * 24);

  assert.equal(this.subject.monthCompletionProgress(), monthProgress);
});

test('#_numberOfWeekdayHoursUntil calculates weekday hours by excluding weekends', function(assert) {
  // February 1, 7, 8 were weekend days, leaving five weekdays before February 8.
  Timecop.freeze(moment('2015-02-08T00:00:00.000+00:00'));
  var totalHours = 5 * 24;

  assert.equal(this.subject._numberOfWeekdayHoursUntil(8), totalHours);
});

test("#_hoursSinceTodaysStart calculates the number of hours since the day's start", function(assert) {
  // February 20, 2015 12pm
  Timecop.freeze(moment('2015-02-20T12:00:00.000+00:00'));

  assert.equal(this.subject._hoursSinceTodaysStart(), 12);
});

test("#_hoursSinceTodaysStart handles rounding down the number of hours since the day's start", function(assert) {
  // February 20, 2015 12:29pm
  Timecop.freeze(moment('2015-02-20T12:29:00.000+00:00'));

  assert.equal(this.subject._hoursSinceTodaysStart(), 12);
});

test("#_hoursSinceTodaysStart handles rounding up the number of hours since the day's start", function(assert) {
  // February 20, 2015 11:30pm
  Timecop.freeze(moment('2015-02-20T11:30:00.000+00:00'));

  assert.equal(this.subject._hoursSinceTodaysStart(), 12);
});
