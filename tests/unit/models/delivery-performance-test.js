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

test('#onPaceCreditTarget calculates the on pace credit target, rounded to the nearest tenth', function(assert) {
  // Five weekdays prior to February 8 of a possible total of 20 weekdays.
  // Therefore 25% of the month has been completed.
  Timecop.freeze(moment('2015-02-08T00:00:00.000+00:00'));

  Ember.run(() => {
    this.model.set('monthlyTarget', 30);
  });

  assert.equal(this.model.get('onPaceCreditTarget'), 7.5);
});

test("isOnTarget returns true when the current credit count exceeds the monthly target", function(assert) {
  Ember.run(() => {
    this.model.setProperties({currentMonthCreditCount: 31, monthlyTarget: 30});
  });

  assert.equal(this.model.get('isOnTarget'), true);
});

test("isOnTarget returns true when the current credit count equals the monthly target", function(assert) {
  Ember.run(() => {
    this.model.setProperties({currentMonthCreditCount: 30, monthlyTarget: 30});
  });

  assert.equal(this.model.get('isOnTarget'), true);
});

test("isOnTarget returns false when the current credit count is less than the monthly target", function(assert) {
  Ember.run(() => {
    this.model.setProperties({currentMonthCreditCount: 29, monthlyTarget: 30});
  });

  assert.equal(this.model.get('isOnTarget'), false);
});

test("isOnPace returns true when the current credit count exceeds the pace target", function(assert) {
  Ember.run(() => {
    this.model.setProperties({currentMonthCreditCount: 30});
    this.model.reopen({onPaceCreditTarget: 20});
  });

  assert.equal(this.model.get('isOnPace'), true);
});

test("isOnPace returns true when the current credit count equals the pace target", function(assert) {
  Ember.run(() => {
    this.model.setProperties({currentMonthCreditCount: 30});
    this.model.reopen({onPaceCreditTarget: 30});
  });

  assert.equal(this.model.get('isOnPace'), true);
});

test("isOnPace returns false when the current credit count is less than the pace target", function(assert) {
  Ember.run(() => {
    this.model.setProperties({currentMonthCreditCount: 20});
    this.model.reopen({onPaceCreditTarget: 30});
  });

  assert.equal(this.model.get('isOnPace'), false);
});

test('#_weekdayHoursSinceBeginningOfMonth calculates weekday hours including previous hours of the current day', function(assert) {
  // February 1, 7, 8 were weekend days. leaving five full weekdays.
  // The current day, February 9, was a Monday and 12 hours had passed.
  Timecop.freeze(moment('2015-02-09T12:00:00.000+00:00'));
  var weekdayHours = (5 * 24) + 12;

  assert.equal(this.model._weekdayHoursSinceBeginningOfMonth(), weekdayHours);
});

test('#_totalWeekdayHoursInCurrentMonth calculates the number of weekday hours in the current month', function(assert) {
  // There are 20 weekdays in the month of February.
  // http://www.wolframalpha.com/input/?i=number+of+weekdays+in+February+2015
  Timecop.freeze(moment('2015-02-20T12:00:00.000+00:00'));
  var weekdayHoursInMonth = 20 * 24;

  assert.equal(this.model._totalWeekdayHoursInCurrentMonth(), weekdayHoursInMonth);
});

test('#monthCompletionProgress calculates how far along the month has completed', function(assert) {
  // Five weekdays prior to February 8 of a possible total of 20 weekdays.
  Timecop.freeze(moment('2015-02-08T00:00:00.000+00:00'));
  var monthProgress = (5 * 24) / (20 * 24);

  assert.equal(this.model.monthCompletionProgress(), monthProgress);
});

test('#_numberOfWeekdayHoursUntil calculates weekday hours by excluding weekends', function(assert) {
  // February 1, 7, 8 were weekend days, leaving five weekdays before February 8.
  Timecop.freeze(moment('2015-02-08T00:00:00.000+00:00'));
  var totalHours = 5 * 24;

  assert.equal(this.model._numberOfWeekdayHoursUntil(8), totalHours);
});

test("#_hoursSinceTodaysStart calculates the number of hours since the day's start", function(assert) {
  // February 20, 2015 12pm
  Timecop.freeze(moment('2015-02-20T12:00:00.000+00:00'));

  assert.equal(this.model._hoursSinceTodaysStart(), 12);
});

test("#_hoursSinceTodaysStart handles rounding down the number of hours since the day's start", function(assert) {
  // February 20, 2015 12:29pm
  Timecop.freeze(moment('2015-02-20T12:29:00.000+00:00'));

  assert.equal(this.model._hoursSinceTodaysStart(), 12);
});

test("#_hoursSinceTodaysStart handles rounding up the number of hours since the day's start", function(assert) {
  // February 20, 2015 11:30pm
  Timecop.freeze(moment('2015-02-20T11:30:00.000+00:00'));

  assert.equal(this.model._hoursSinceTodaysStart(), 12);
});
