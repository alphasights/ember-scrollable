import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ember-scrollable', 'Unit | Component | ember scrollable', {
  // Specify the other units that are required for this test
  needs: ['service:scrollbar-thickness'],
  unit: true
});

test('ensure createScrollbar returns an array if destroyed', function(assert) {
  let component;
  run(() => {
    component = this.subject();
    component.destroy();
  });

  let scrollbars = component.createScrollbar();

  assert.equal(scrollbars.length, 0);
});
