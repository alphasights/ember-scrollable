import Ember from 'ember';
import PerformableMixin from '../../../mixins/performable';
import { module, test } from 'qunit';

module('Performable Mixin', {
  beforeEach: function() {
    var PerformableObject = Ember.Object.extend(PerformableMixin);
    this.subject = PerformableObject.create();
  }
});

test("paceIsExceptional returns true when the current credit is greater than 2.5 times the pace target", function(assert) {
  Ember.run(() => {
    this.subject.setProperties({
      currentMonthCreditCount: 50.1,
      onPaceCreditTarget: 20
    });
  });

  assert.equal(this.subject.get('paceIsExceptional'), true);
});

test("paceIsExceptional returns true when the current credit is exactly 2.5 times the pace target", function(assert) {
  Ember.run(() => {
    this.subject.setProperties({
      currentMonthCreditCount: 50,
      onPaceCreditTarget: 20
    });
  });

  assert.equal(this.subject.get('paceIsExceptional'), true);
});

test("paceIsExceptional returns false when the current credit is less than 2.5 times the pace target", function(assert) {
  Ember.run(() => {
    this.subject.setProperties({
      currentMonthCreditCount: 49.9,
      onPaceCreditTarget: 20
    });
  });

  assert.equal(this.subject.get('paceIsExceptional'), false);
});

test("isMoreThanOnPace returns true when the current credit is greater than 1.5 times the pace target", function(assert) {
  Ember.run(() => {
    this.subject.setProperties({
      currentMonthCreditCount: 30.1,
      onPaceCreditTarget: 20
    });
  });

  assert.equal(this.subject.get('isMoreThanOnPace'), true);
});

test("isMoreThanOnPace returns true when the current credit is exactly 1.5 times the pace target", function(assert) {
  Ember.run(() => {
    this.subject.setProperties({
      currentMonthCreditCount: 30,
      onPaceCreditTarget: 20
    });
  });

  assert.equal(this.subject.get('isMoreThanOnPace'), true);
});

test("isMoreThanOnPace returns false when the current credit is less than 1.5 times the pace target", function(assert) {
  Ember.run(() => {
    this.subject.setProperties({
      currentMonthCreditCount: 29.9,
      onPaceCreditTarget: 20
    });
  });

  assert.equal(this.subject.get('isMoreThanOnPace'), false);
});

test("isOnPace returns true when the current credit count exceeds the pace target", function(assert) {
  Ember.run(() => {
    this.subject.setProperties({
      currentMonthCreditCount: 20.1,
      onPaceCreditTarget: 20
    });
  });

  assert.equal(this.subject.get('isOnPace'), true);
});

test("isOnPace returns true when the current credit count equals the pace target", function(assert) {
  Ember.run(() => {
    this.subject.setProperties({
      currentMonthCreditCount: 20,
      onPaceCreditTarget: 20
    });
  });

  assert.equal(this.subject.get('isOnPace'), true);
});

test("isOnPace returns false when the current credit count is less than the pace target", function(assert) {
  Ember.run(() => {
    this.subject.setProperties({
      currentMonthCreditCount: 19.9,
      onPaceCreditTarget: 20
    });
  });

  assert.equal(this.subject.get('isOnPace'), false);
});
