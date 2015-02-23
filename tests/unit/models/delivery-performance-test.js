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
    this.model = this.subject(
      { currentMonthCreditCount: 10, monthlyTarget: 30 }
    );
  }
});

test('1', function() {
  debugger
});
