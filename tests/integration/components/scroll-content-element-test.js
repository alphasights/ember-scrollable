import Ember from 'ember';
import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

const {run} = Ember;

moduleForComponent('scroll-content-element', 'Integration | Component | scroll content element', {
  integration: true
});

const ARBITRARY_DELAY_TIME = 40;
const cssSelector = '.tse-scroll-content';

const VERTICAL_TEMPLATE = hbs`
    <div class="tse-scrollable vertical">
      {{#scroll-content-element
        height=10
        width=10
        scrollToY=scrollToY
        onScroll=(action 'scrolled')
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
        scrollToX=scrollToX
        onScroll=(action 'scrolled')
      }}
        <div style="height: 40px; width: 40px;">
          Content
        </div>
      {{/scroll-content-element}}
    </div>
  `;


function testInitialOffsetTriggersAScrollEvent(assert, template, scrollProp, direction) {
  assert.expect(2);
  const done = assert.async();
  this.setProperties({
    [scrollProp]: 5
  });

  const scrolledCallArgs = [];
  this.on('scrolled', function(e, scollOffset, scrollDir) {
    scrolledCallArgs.push([scollOffset, scrollDir]);
  });

  // Template block usage:
  this.render(template);

  // TODO why run.later :(
  run.later(this, () => {
    assert.deepEqual(scrolledCallArgs[0], [5, direction]);
    assert.deepEqual(scrolledCallArgs.length, 1);
    done();
  }, ARBITRARY_DELAY_TIME);
  return done;
}

test('Vertical: Initial offset triggers a scroll event', function(assert) {
  return testInitialOffsetTriggersAScrollEvent.apply(this, [assert, VERTICAL_TEMPLATE, 'scrollToY', 'vertical']);
});

test('Horizontal: Initial offset triggers a scroll event', function(assert) {
  return testInitialOffsetTriggersAScrollEvent.apply(this, [assert, HORIZONTAL_TEMPLATE, 'scrollToX', 'horizontal']);
});


function testDefaultOffsetNoScrollEventTriggered(assert, template, scrollProp) {
  assert.expect(1);

  this.setProperties({
    [scrollProp]: 0
  });

  const scrolledCallArgs = [];
  this.on('scrolled', function(e, scollOffset, scrollDir) {
    scrolledCallArgs.push([scollOffset, scrollDir]);
  });

  // Template block usage:
  this.render(template);


  return wait().then(() => {
    assert.equal(scrolledCallArgs.length, 0);
  });
}

test('Vertical: Default offset, no event triggered', function(assert) {
  return testDefaultOffsetNoScrollEventTriggered.apply(this, [assert, VERTICAL_TEMPLATE, 'scrollToY']);
});

test('Horizontal: Default offset, no event triggered', function(assert) {
  return testDefaultOffsetNoScrollEventTriggered.apply(this, [assert, HORIZONTAL_TEMPLATE, 'scrollToX']);
});


function testScrollOccursAndEventTriggersWithDirectionAndOffset(assert, template, scrollProp, direction) {
  assert.expect(3);

  const initialPosition = 10;
  const firstMovement = 5;
  const secondMovement = 25;

  const done = assert.async();

  this.setProperties({
    [scrollProp]: initialPosition
  });

  const scrollMethod = direction === 'horizontal' ? 'scrollLeft' : 'scrollTop';

  const scrolledCallArgs = [];
  this.on('scrolled', function(e, scrollOffset, scrollDir) {
    scrolledCallArgs.push([scrollOffset, scrollDir]);
  });

  // Template block usage:
  this.render(template);
  // Initial non-zero offset triggers a scroll event.

  // TODO can't figure out what i did wrong in order to need these run laters with an arbitrary time
  // scroll event is aysync, but I don't feel it's bound correctly to ember's run loops
  run.later(this, () => {
    // WHEN the scrollX position has moved left to 0px
    this.$(cssSelector)[scrollMethod](firstMovement);
    run.later(this, () => {
      // and then right to 25px;
      this.$(cssSelector)[scrollMethod](secondMovement);
      run.later(this, () => {
        //THEN scroll gets called accordingly, and a horizontal scroll is detected
        assert.deepEqual(scrolledCallArgs[0], [initialPosition, direction]);
        assert.deepEqual(scrolledCallArgs[1], [firstMovement, direction]);
        assert.deepEqual(scrolledCallArgs[2], [secondMovement, direction]);
        done();
      }, ARBITRARY_DELAY_TIME);
    }, ARBITRARY_DELAY_TIME);
  }, ARBITRARY_DELAY_TIME);

  return done;
}

test('Vertical: scroll occurs and reports back the scrollTop value and direction', function(assert) {
  return testScrollOccursAndEventTriggersWithDirectionAndOffset.apply(this, [assert, VERTICAL_TEMPLATE, 'scrollToY', 'vertical']);
});

test('Horizontal scroll occurs and reports back the scrollLeft value and direction', function(assert) {
  return testScrollOccursAndEventTriggersWithDirectionAndOffset.apply(this, [assert, HORIZONTAL_TEMPLATE, 'scrollToX', 'horizontal']);
});
