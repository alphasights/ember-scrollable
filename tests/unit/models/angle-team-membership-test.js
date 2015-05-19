import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('angle-team-membership', 'Angle Team Membership', {
  needs: [
    'model:angle-team-membership', 'model:angle', 'model:user', 'model:project',
    'model:delivery-performance'
  ],

  beforeEach: function() {
    this.model = this.subject();
  }
});

test("deliveryTarget cannot be set below 0", function(assert) {
  Ember.run(() => {
    this.model.set('deliveryTarget', -5);
  });

  assert.equal(this.model.get('deliveryTarget'), 0);
});
