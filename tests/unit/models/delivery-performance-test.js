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
