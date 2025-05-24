import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | ember-scrollable', function (hooks) {
  setupTest(hooks);

  test('ensure createScrollbar returns an array if destroyed', function (assert) {
    let component;
    run(() => {
      component = this.owner.factoryFor('component:ember-scrollable').create();
      component.destroy();
    });

    let scrollbars = component.createScrollbar();

    assert.strictEqual(scrollbars.length, 0);
  });
});
