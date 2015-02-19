import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('delivery-performance', 'DeliveryPerformance', {
  needs: ['model:user']
});

test('it exists', function() {
  var model = this.subject();
  ok(!!model);
});
