import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { click, find, fillIn, triggerEvent } from 'ember-native-dom-helpers/test-support/helpers';

moduleForAcceptance('Acceptance | ember-scrollbar');

function elementHeight(elem) {
  return elem.getBoundingClientRect().height;
}

test('vertical scrollbar', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');

    assert.ok(find('.vertical-demo .ember-scrollable'), 'vertical demo rendered');
    assert.ok(find('.vertical-demo .ember-scrollable .drag-handle'), 'vertical demo handle rendered');
  });

});

test('resizable scrollbar', function(assert) {
  let elem;
  const toggleButtonSelector = '.resize-demo button';
  visit('/');

  andThen(function() {
    elem = find('.resize-demo .ember-scrollable');

    assert.ok(find('.resize-demo .ember-scrollable'), 'resize demo rendered');
    assert.ok(find('.resize-demo .ember-scrollable .drag-handle'), 'resize handle rendered');
    assert.equal(elementHeight(elem), 200);

    click(toggleButtonSelector); // make tall

  });

  andThen(function() {
    assert.equal(elementHeight(elem), 400);

    click(toggleButtonSelector); // make small
  });


  andThen(function() {
    assert.equal(elementHeight(elem), 200);
  });

});

test('scrollTo and onScroll', function(assert) {
  visit('/');
  let offset;

  andThen(function() {
    assert.ok(find('.event-and-setter-demo .ember-scrollable'), 'scrolling demo rendered');
    assert.ok(find('.event-and-setter-demo .ember-scrollable .drag-handle'), 'scrolling handle rendered');

    offset = 123;

    fillIn('#targetScrollOffset input', offset);
  });

  andThen(function() {
    assert.ok(find('#currentScrollOffset').innerText.indexOf(String(offset)) !== -1, 'scrollOffset matches');
  });

});


test('When element resized from no-overflow => overflow => no-overflow, no scrollbar is visible on mouseover', function(assert) {
  let scrollArea;
  let toggleButtonSelector = '.no-scrollbar-demo button';
  visit('/');

  andThen(function() {
    assert.ok(find('.no-scrollbar-demo .ember-scrollable'), 'resize demo rendered');
    assert.ok(find('.no-scrollbar-demo .ember-scrollable .drag-handle:not(.visible)'), 'resize handle rendered, but not visible');
    scrollArea = find('.no-scrollbar-demo .ember-scrollable .scrollable-content');
    assert.equal(elementHeight(scrollArea), 18, 'there is no overflow as 18 < 200px');

    click(toggleButtonSelector);
  });

  andThen(function() {
    assert.equal(elementHeight(scrollArea), 494, 'there is overflow as 494 > 200px');

    triggerEvent(scrollArea, 'mousemove');
    assert.ok(find('.no-scrollbar-demo .ember-scrollable .drag-handle.visible'), 'handle shows up visible');

    click(toggleButtonSelector);
  });

  andThen(function() {
    assert.equal(elementHeight(scrollArea), 18);
    assert.ok(find('.no-scrollbar-demo .ember-scrollable .drag-handle:not(.visible)'), 'handle goes away when overflow is gone');
  });

});
