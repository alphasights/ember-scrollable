import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  visit,
  currentURL,
  click,
  fillIn,
  find,
  triggerEvent,
} from '@ember/test-helpers';
import { timeout } from 'ember-scrollable/util/timeout';
import { THROTTLE_TIME_LESS_THAN_60_FPS_IN_MS } from 'ember-scrollable/components/ember-scrollable';

module('Acceptance | ember-scrollbar', function (hooks) {
  setupApplicationTest(hooks);

  function elementHeight(elem) {
    return elem.getBoundingClientRect().height;
  }

  test('vertical scrollbar', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');

    assert.ok(
      find('.vertical-demo .ember-scrollable'),
      'vertical demo rendered'
    );
    assert.ok(
      find('.vertical-demo .ember-scrollable .drag-handle'),
      'vertical demo handle rendered'
    );
  });

  test('resizable scrollbar', async function (assert) {
    let elem;
    const toggleButtonSelector = '.resize-demo button';
    await visit('/');

    elem = find('.resize-demo .ember-scrollable');

    assert.ok(find('.resize-demo .ember-scrollable'), 'resize demo rendered');
    assert.ok(
      find('.resize-demo .ember-scrollable .drag-handle'),
      'resize handle rendered'
    );
    assert.strictEqual(elementHeight(elem), 200);

    await click(toggleButtonSelector); // make tall

    assert.strictEqual(elementHeight(elem), 400);

    await click(toggleButtonSelector); // make small
    assert.strictEqual(elementHeight(elem), 200);
  });

  test('scrollTo and onScroll', async function (assert) {
    await visit('/');
    let offset;

    assert.ok(
      find('.event-and-setter-demo .ember-scrollable'),
      'scrolling demo rendered'
    );
    assert.ok(
      find('.event-and-setter-demo .ember-scrollable .drag-handle'),
      'scrolling handle rendered'
    );

    offset = 123;

    await fillIn('#targetScrollOffset input', offset);
    await timeout(THROTTLE_TIME_LESS_THAN_60_FPS_IN_MS);
    assert.notStrictEqual(
      find('#currentScrollOffset').innerText.indexOf(String(offset)),
      -1,
      'scrollOffset matches'
    );
  });

  test('When element resized from no-overflow => overflow => no-overflow, no scrollbar is visible on mouseover', async function (assert) {
    let scrollArea;
    let toggleButtonSelector = '.no-scrollbar-demo button';
    await visit('/');

    assert.ok(
      find('.no-scrollbar-demo .ember-scrollable'),
      'resize demo rendered'
    );
    assert.ok(
      find('.no-scrollbar-demo .ember-scrollable .drag-handle:not(.visible)'),
      'resize handle rendered, but not visible'
    );
    scrollArea = find(
      '.no-scrollbar-demo .ember-scrollable .scrollable-content'
    );
    assert.ok(
      elementHeight(scrollArea) < 200,
      'there is no overflow as ~18 < 200px'
    );

    await click(toggleButtonSelector);
    scrollArea = find(
      '.no-scrollbar-demo .ember-scrollable .scrollable-content'
    );
    assert.ok(
      elementHeight(scrollArea) > 200,
      'there is overflow as ~500 > 200px'
    );

    await triggerEvent(
      '.no-scrollbar-demo .ember-scrollable .scrollable-content',
      'mousemove'
    );
    assert.ok(
      find('.no-scrollbar-demo .ember-scrollable .drag-handle.visible'),
      'handle shows up visible'
    );

    await click(toggleButtonSelector);
    assert.ok(elementHeight(scrollArea) < 20, 'height is ~18');
    assert.ok(
      find('.no-scrollbar-demo .ember-scrollable .drag-handle:not(.visible)'),
      'handle goes away when overflow is gone'
    );
  });
});
