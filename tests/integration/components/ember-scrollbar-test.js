import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import jQuery from 'jquery';

module('Integration | Component | ember scrollbar', function (hooks) {
  setupRenderingTest(hooks);

  const handleClass = '.drag-handle';
  const barClass = '.tse-scrollbar';

  function leftElementOffset(selector) {
    return find(selector).getBoundingClientRect().left;
  }

  function topElementOffset(selector) {
    return find(selector).getBoundingClientRect().top;
  }

  test('Horizontal: offset and size get routed properly', async function (assert) {
    assert.expect(4);

    this.setProperties({
      size: 40,
      offset: 10,
    });
    await render(hbs`
      <div style="height: 50px">
      <div class="tse-scrollable horizontal" >

      {{ember-scrollbar
        handleOffset=this.offset
        handleSize=this.size
        horizontal=true
        showHandle=true
      }}

      </div>
    </div>`);
    assert.strictEqual(jQuery(handleClass).position().left, this.offset);
    assert.strictEqual(
      Number.parseInt(jQuery(handleClass).css('width')),
      this.size
    );
    assert.strictEqual(
      this.element.querySelector(handleClass).offsetLeft,
      this.offset
    );
    assert.strictEqual(
      Number.parseInt(this.element.querySelector(handleClass).style.width),
      this.size
    );
  });

  test('Vertical: offset and size get routed properly', async function (assert) {
    assert.expect(4);

    this.setProperties({
      size: 40,
      offset: 10,
    });
    await render(hbs`
      <div style="height: 50px">
      <div class="tse-scrollable vertical" >

      {{ember-scrollbar
        handleOffset=this.offset
        handleSize=this.size
        horizontal=false
        showHandle=true
      }}

      </div>
    </div>`);

    assert.strictEqual(jQuery(handleClass).position().top, this.offset);
    assert.strictEqual(
      Number.parseInt(jQuery(handleClass).css('height')),
      this.size
    );
    assert.strictEqual(jQuery(handleClass).position().top, this.offset);
    assert.strictEqual(
      Number.parseInt(jQuery(handleClass).css('height')),
      this.size
    );
  });

  test('click event on handle triggers startDrag, but not onJumpTo', async function (assert) {
    assert.expect(1);

    this.setProperties({
      size: 40,
      offset: 10,
    });

    this.onDragStart = function () {
      assert.ok(true);
    };

    this.onJumpTo = function () {
      assert.ok(false);
    };

    await render(hbs`
      <div style="height: 50px">
      <div class="tse-scrollable horizontal" >

      {{ember-scrollbar
        handleOffset=this.offset
        handleSize=this.size
        horizontal=true
        showHandle=true
        onDragStart=this.onDragStart
        onJumpTo=this.onJumpTo
      }}

      </div>
    </div>`);

    click(handleClass);
  });

  test('clicking on bar triggers onJumpTo and not startDrag', async function (assert) {
    assert.expect(1);

    this.setProperties({
      size: 40,
      offset: 10,
    });

    this.onDragStart = function () {
      assert.ok(false);
    };

    this.onJumpTo = function () {
      assert.ok(true);
    };

    await render(hbs`
      <div style="height: 50px">
      <div class="tse-scrollable horizontal" >

      {{ember-scrollbar
        handleOffset=this.offset
        handleSize=this.size
        horizontal=true
        showHandle=true
        onDragStart=this.onDragStart
        onJumpTo=this.onJumpTo
      }}

      </div>
    </div>`);

    // WHEN we click on the bar and not the handle
    click(barClass);
  });

  test('Horizontal: onJumpTo first argument is true when click to the left of handle', async function (assert) {
    assert.expect(1);

    const deltaX = 9; // some number less than 10, therefore `towardsAnchor` will be true
    this.setProperties({
      size: 40,
      offset: 10,
    });
    this.onJumpTo = function (towardsAnchor) {
      assert.ok(
        towardsAnchor,
        'towardsAnchor should be true if going towards anchor'
      );
    };

    await render(hbs`
      <div style="height: 50px">
      <div class="tse-scrollable horizontal" >

      {{ember-scrollbar
        handleOffset=this.offset
        handleSize=this.size
        horizontal=true
        showHandle=true
        onJumpTo=this.onJumpTo
      }}

      </div>
    </div>`);

    // WHEN
    const clientX = leftElementOffset(barClass) + deltaX;
    click(barClass, { clientX });
  });

  test('Horizontal: onJumpTo first argument is false when click to the right of handle', async function (assert) {
    assert.expect(1);

    const deltaX = 30; // more than offset of 10
    this.setProperties({
      size: 40,
      offset: 10,
    });
    this.onJumpTo = function (towardsAnchor) {
      assert.notOk(
        towardsAnchor,
        'towardsAnchor should be false if going away from anchor'
      );
    };

    await render(hbs`
      <div style="height: 50px">
      <div class="tse-scrollable horizontal" >

      {{ember-scrollbar
        handleOffset=this.offset
        handleSize=this.size
        horizontal=true
        showHandle=true
        onJumpTo=this.onJumpTo
      }}

      </div>
    </div>`);

    // WHEN
    const clientX = leftElementOffset(barClass) + deltaX;
    click(barClass, { clientX });
  });

  test('Vertical: onJumpTo first argument is true when click to the top of handle', async function (assert) {
    assert.expect(1);

    const deltaY = 2; // less than offset of 10
    this.setProperties({
      size: 40,
      offset: 10,
    });
    this.onJumpTo = function (towardsAnchor) {
      assert.ok(
        towardsAnchor,
        'towardsAnchor should be true if going towards anchor'
      );
    };

    await render(hbs`
      <div style="height: 50px">
      <div class="tse-scrollable vertical" >

      {{ember-scrollbar
        handleOffset=this.offset
        handleSize=this.size
        horizontal=false
        showHandle=true
        onJumpTo=this.onJumpTo
      }}

      </div>
    </div>`);

    // WHEN
    const clientY = topElementOffset(barClass) + deltaY;
    click(barClass, { clientY });
  });

  test('Vertical: onJumpTo first argument is false when clicking below the vertical handle', async function (assert) {
    assert.expect(1);

    const deltaY = 30; // more than offset of 10
    this.setProperties({
      size: 40,
      offset: 10,
    });
    this.onJumpTo = function (towardsAnchor) {
      assert.notOk(
        towardsAnchor,
        'towardsAnchor should be false if going away from anchor'
      );
    };

    await render(hbs`
      <div style="height: 50px">
      <div class="tse-scrollable vertical" >

      {{ember-scrollbar
        handleOffset=this.offset
        handleSize=this.size
        horizontal=false
        showHandle=true
        onJumpTo=this.onJumpTo
      }}

      </div>
    </div>`);

    // WHEN
    const clientY = topElementOffset(barClass) + deltaY;
    click(barClass, { clientY });
  });

  test('mouseup event triggers onDragEnd', async function (assert) {
    assert.expect(1);

    this.setProperties({
      size: 40,
      offset: 10,
    });
    let called = false;
    this.onDragEnd = function () {
      called = true;
    };

    await render(hbs`
      <div style="height: 50px">
      <div class="tse-scrollable horizontal" >

      {{ember-scrollbar
        handleOffset=this.offset
        handleSize=this.size
        horizontal=true
        showHandle=true
        onDragEnd=this.onDragEnd
      }}

      </div>
    </div>`);

    await triggerEvent(handleClass, 'mouseup');

    assert.ok(called);
  });

  test('Vertical: onDrag is called when a change occurs when onDragging is true and mousemove event is triggered', async function (assert) {
    assert.expect(1);

    this.setProperties({
      size: 40,
      offset: 10,
      isDragging: false,
    });

    this.onDrag = function () {
      // THEN
      assert.ok(true);
    };

    await render(hbs`
      <div style="height: 50px">
      <div class="tse-scrollable vertical" >

      {{ember-scrollbar
        handleOffset=this.offset
        handleSize=this.size
        horizontal=false
        dragOffset=30
        isDragging=this.isDragging
        showHandle=true
        onDrag=this.onDrag
      }}

      </div>
    </div>`);

    // WHEN
    this.set('isDragging', true);
    triggerEvent(window, 'mousemove', { pageX: 0, pageY: 0 });
  });

  test('Horizontal: onDrag is called when a change occurs when onDragging is true and mousemove event is triggered', async function (assert) {
    assert.expect(1);

    this.setProperties({
      size: 40,
      offset: 10,
      isDragging: false,
    });
    this.onDrag = function () {
      // THEN
      assert.ok(true);
    };

    await render(hbs`
      <div style="height: 50px">
      <div class="tse-scrollable horizontal" >

      {{ember-scrollbar
        handleOffset=this.offset
        handleSize=this.size
        horizontal=true
        dragOffset=30
        isDragging=this.isDragging
        showHandle=true
        onDrag=this.onDrag
      }}

      </div>
    </div>`);

    // WHEN
    this.set('isDragging', true);
    triggerEvent(window, 'mousemove', { pageX: 0, pageY: 0 });
  });

  // TODO verify that the drag percentage is calculated from mouse offset and drag offset and is a percentage between 0 and 1 of the scrollbar size
});
