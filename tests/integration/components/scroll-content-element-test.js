import Ember from 'ember';
import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const {
  run
} = Ember;

moduleForComponent('scroll-content-element', 'Integration | Component | scroll content element', {
  integration: true
});

const cssSelector = '.tse-scroll-content';


// TODO get these tests to pass using the appropritae runloop timing

test('Vertical scroll occurs and reports back the scrollTop value and direction', function(assert) {
  assert.expect(2);

  this.setProperties({
    scrollToX: 0,
    scrollToY: 0,
  });

  const scrolledCallArgs = [];
  this.on('scrolled', function(e, scrollTop, scrollDir) {
    scrolledCallArgs.push([scrollTop, scrollDir]);
  });

  // Template block usage:
  this.render(hbs`
    <div class="tse-scrollable vertical">
      {{#scroll-content-element
        height=10
        width=10
        scrollToX=scrollToX
        scrollToY=scrollToY
        onScroll=(action 'scrolled')
      }}
        <div style="height: 40px; width: 40px;">
          Content
        </div>
      {{/scroll-content-element}}
    </div>
  `);
  const firstPosition = 10;
  const secondPosition = 25;

  // WHEN the scrollY position has moved 10 px
  this.$(cssSelector).scrollTop(firstPosition);

  // and then again by 15
  this.$(cssSelector).scrollTop(secondPosition);

  //THEN scroll gets called accordingly, and a vertical scroll is detected
  assert.deepEqual(scrolledCallArgs[0], [firstPosition, 'vertical']);
  assert.deepEqual(scrolledCallArgs[1], [secondPosition, 'vertical']);

});


test('Horizontal scroll occurs and reports back the scrollLeft value and direction', function(assert) {
  assert.expect(2);

  this.setProperties({
    scrollToX: 5,
    scrollToY: 5,
  });

  const scrolledCallArgs = [];
  this.on('scrolled', function(e, scrollLeft, scrollDir) {
    scrolledCallArgs.push([scrollLeft, scrollDir]);
  });

  // Template block usage:
  this.render(hbs`
    <div class="tse-scrollable horizontal vertical">
      {{#scroll-content-element
        height=10
        width=10
        scrollToX=scrollToX
        scrollToY=scrollToY
        onScroll=(action 'scrolled')
      }}
        <div style="height: 40px; width: 40px;">
          Content
        </div>
      {{/scroll-content-element}}
    </div>
  `);
  const firstPosition = 0;
  const secondPosition = 25;

  // WHEN the scrollX position has moved left to 0px
  this.$(cssSelector).scrollLeft(firstPosition);

  // and then right to 25px;
  this.$(cssSelector).scrollLeft(secondPosition);

  //THEN scroll gets called accordingly, and a vertical scroll is detected
  assert.deepEqual(scrolledCallArgs[0], [firstPosition, 'horizontal']);
  assert.deepEqual(scrolledCallArgs[1], [secondPosition, 'horizontal']);
});
