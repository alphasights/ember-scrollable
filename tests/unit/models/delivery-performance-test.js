import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('delivery-performance', 'DeliveryPerformance', {
  needs: ['model:user'],

  beforeEach: function() {
    Timecop.install();

    this.model = this.subject();
  },

  afterEach: function() {
    Timecop.uninstall();
  }
});

test('#onPaceCreditTarget calculates the on pace credit target, rounded to the nearest tenth', function() {
  // Five weekdays prior to February 8 of a possible total of 20 weekdays.
  // Therefore 25% of the month has been completed.
  Timecop.freeze(moment('2015-02-08T00:00:00.000+00:00'));

  Ember.run(() => {
    this.model.set('monthlyTarget', 30);
  });

  equal(this.model.get('onPaceCreditTarget'), 7.5);
});

test('#weekdayHoursSinceBeginningOfMonth calculates weekday hours including previous hours of the current day', function() {
  // February 1, 7, 8 were weekend days. leaving five full weekdays.
  // The current day, February 9, was a Monday and 12 hours had passed.
  Timecop.freeze(moment('2015-02-09T12:00:00.000+00:00'));
  var weekdayHours = (5 * 24) + 12;

  equal(this.model.weekdayHoursSinceBeginningOfMonth(), weekdayHours);
});

test('#totalWeekdayHoursInCurrentMonth calculates the number of weekday hours in the current month', function() {
  // There are 20 weekdays in the month of February.
  // http://www.wolframalpha.com/input/?i=number+of+weekdays+in+February+2015
  Timecop.freeze(moment('2015-02-20T12:00:00.000+00:00'));
  var weekdayHoursInMonth = 20 * 24;

  equal(this.model.totalWeekdayHoursInCurrentMonth(), weekdayHoursInMonth);
});

test('#monthCompletionProgress calculates how far along the month has completed', function() {
  // Five weekdays prior to February 8 of a possible total of 20 weekdays.
  Timecop.freeze(moment('2015-02-08T00:00:00.000+00:00'));
  var monthProgress = (5 * 24) / (20 * 24);

  equal(this.model.monthCompletionProgress(), monthProgress);
});

test('#numberOfWeekdayHoursUntil calculates weekday hours by excluding weekends', function() {
  // February 1, 7, 8 were weekend days, leaving five weekdays before February 8.
  Timecop.freeze(moment('2015-02-08T00:00:00.000+00:00'));
  var totalHours = 5 * 24;

  equal(this.model.numberOfWeekdayHoursUntil(8), totalHours);
});

test("#hoursSinceTodaysStart calculates the number of hours since the day's start", function() {
  // February 20, 2015 12pm
  Timecop.freeze(moment('2015-02-20T12:00:00.000+00:00'));

  equal(this.model.hoursSinceTodaysStart(), 12);
});

test("#hoursSinceTodaysStart handles rounding down the number of hours since the day's start", function() {
  // February 20, 2015 12:29pm
  Timecop.freeze(moment('2015-02-20T12:29:00.000+00:00'));

  equal(this.model.hoursSinceTodaysStart(), 12);
});

test("#hoursSinceTodaysStart handles rounding up the number of hours since the day's start", function() {
  // February 20, 2015 11:30pm
  Timecop.freeze(moment('2015-02-20T11:30:00.000+00:00'));

  equal(this.model.hoursSinceTodaysStart(), 12);
});
