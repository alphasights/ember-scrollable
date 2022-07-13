import { Promise } from 'rsvp';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import jQuery from 'jquery';

module('Integration | Component | scroll content element', function (hooks) {
  setupRenderingTest(hooks);

  const flushScrollAndWait = function () {
    return settled().then(() => {
      return new Promise((resolve) => {
        window.requestAnimationFrame(resolve);
      });
    });
  };

  const cssSelector = '.tse-scroll-content';

  const VERTICAL_TEMPLATE = hbs`
      <div class="tse-scrollable vertical">
        {{#scroll-content-element
          height=10
          width=10
          scrollToY=this.scrollToY
          onScroll=this.scrolled
        }}
          <div style="height: 40px; width: 40px;">
            Content
          </div>
        {{/scroll-content-element}}
      </div>
    `;

  const HORIZONTAL_TEMPLATE = hbs`
      <div class="tse-scrollable horizontal">
        {{#scroll-content-element
          height=10
          width=10
          scrollToX=this.scrollToX
          onScroll=this.scrolled
        }}
          <div style="height: 40px; width: 40px;">
            Content
          </div>
        {{/scroll-content-element}}
      </div>
    `;

  function testInitialOffsetTriggersAScrollEvent(
    assert,
    template,
    scrollProp,
    direction
  ) {
    assert.expect(2);
    const done = assert.async();
    this.setProperties({
      [scrollProp]: 5,
    });

    const scrolledCallArgs = [];
    this.scrolled = function (e, scollOffset, scrollDir) {
      scrolledCallArgs.push([scollOffset, scrollDir]);
    };

    // Template block usage:
    render(template);

    flushScrollAndWait().then(() => {
      assert.deepEqual(scrolledCallArgs[0], [5, direction]);
      assert.deepEqual(scrolledCallArgs.length, 1);
      done();
    });
    return done;
  }

  test('Vertical: Initial offset triggers a scroll event', function (assert) {
    return testInitialOffsetTriggersAScrollEvent.apply(this, [
      assert,
      VERTICAL_TEMPLATE,
      'scrollToY',
      'vertical',
    ]);
  });

  test('Horizontal: Initial offset triggers a scroll event', function (assert) {
    return testInitialOffsetTriggersAScrollEvent.apply(this, [
      assert,
      HORIZONTAL_TEMPLATE,
      'scrollToX',
      'horizontal',
    ]);
  });

  function testDefaultOffsetNoScrollEventTriggered(
    assert,
    template,
    scrollProp
  ) {
    assert.expect(1);

    this.setProperties({
      [scrollProp]: 0,
    });

    const scrolledCallArgs = [];
    this.scrolled = function (e, scollOffset, scrollDir) {
      scrolledCallArgs.push([scollOffset, scrollDir]);
    };

    // Template block usage:
    render(template);

    return settled().then(() => {
      assert.strictEqual(scrolledCallArgs.length, 0);
    });
  }

  test('Vertical: Default offset, no event triggered', function (assert) {
    return testDefaultOffsetNoScrollEventTriggered.apply(this, [
      assert,
      VERTICAL_TEMPLATE,
      'scrollToY',
    ]);
  });

  test('Horizontal: Default offset, no event triggered', function (assert) {
    return testDefaultOffsetNoScrollEventTriggered.apply(this, [
      assert,
      HORIZONTAL_TEMPLATE,
      'scrollToX',
    ]);
  });

  function testScrollOccursAndEventTriggersWithDirectionAndOffset(
    assert,
    template,
    scrollProp,
    direction
  ) {
    assert.expect(3);

    const initialPosition = 10;
    const firstMovement = 5;
    const secondMovement = 25;

    const done = assert.async();

    this.setProperties({
      [scrollProp]: initialPosition,
    });

    const scrollMethod =
      direction === 'horizontal' ? 'scrollLeft' : 'scrollTop';

    const scrolledCallArgs = [];
    this.scrolled = function (e, scrollOffset, scrollDir) {
      scrolledCallArgs.push([scrollOffset, scrollDir]);
    };

    // Template block usage:
    render(template);
    // Initial non-zero offset triggers a scroll event.

    flushScrollAndWait().then(() => {
      // WHEN the scrollX position has moved left to 0px
      jQuery(cssSelector)[scrollMethod](firstMovement);

      flushScrollAndWait().then(() => {
        // and then right to 25px;
        jQuery(cssSelector)[scrollMethod](secondMovement);
        flushScrollAndWait().then(() => {
          //THEN scroll gets called accordingly, and a horizontal scroll is detected
          assert.deepEqual(scrolledCallArgs[0], [initialPosition, direction]);
          assert.deepEqual(scrolledCallArgs[1], [firstMovement, direction]);
          assert.deepEqual(scrolledCallArgs[2], [secondMovement, direction]);
          done();
        });
      });
    });

    return done;
  }

  test('Vertical: scroll occurs and reports back the scrollTop value and direction', function (assert) {
    return testScrollOccursAndEventTriggersWithDirectionAndOffset.apply(this, [
      assert,
      VERTICAL_TEMPLATE,
      'scrollToY',
      'vertical',
    ]);
  });

  test('Horizontal scroll occurs and reports back the scrollLeft value and direction', function (assert) {
    return testScrollOccursAndEventTriggersWithDirectionAndOffset.apply(this, [
      assert,
      HORIZONTAL_TEMPLATE,
      'scrollToX',
      'horizontal',
    ]);
  });
});
