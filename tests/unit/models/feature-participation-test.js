import { moduleForModel, test } from 'ember-qunit';

moduleForModel('feature-participation', 'Unit | Model | feature participation', {
  // Specify the other units that are required for this test.
  needs: ['model:feature', 'model:user']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
