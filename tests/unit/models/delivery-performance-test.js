import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('delivery-performance', 'DeliveryPerformance', {
  needs: [
    'model:user'
  ],

  beforeEach: function() {
    Timecop.install();
    Timecop.freeze(new Date(2015, 2, 20, 0, 0));

    this.model = this.subject(
      { currentMonthCreditCount: 10, monthlyTarget: 30 }
    );
  }

  afterEach: function() {
    Timecop.uninstall();
  }
});

test('1', function() {
  debugger
});
