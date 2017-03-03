import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { click, find, triggerEvent } from 'ember-native-dom-helpers/test-support/helpers';

moduleForComponent('ember-scrollbar', 'Integration | Component | ember scrollbar', {
  integration: true
});

const handleClass = '.drag-handle';
const barClass = '.tse-scrollbar';

function leftElementOffset(selector){
  return find(selector).getBoundingClientRect().left;
}

function topElementOffset(selector){
  return find(selector).getBoundingClientRect().top;
}

test('Horizontal: offset and size get routed properly', function(assert) {
  assert.expect(2);

  this.setProperties({
    size: 40,
    offset: 10
  });
  this.render(hbs`
    <div style="height: 50px">
    <div class="tse-scrollable horizontal" >

    {{ember-scrollbar
      handleOffset=offset
      handleSize=size
      horizontal=true
      showHandle=true
    }}
    
    </div>
  </div>`);

  assert.equal(this.$(handleClass).position().left, this.get('offset'));
  assert.equal(Number.parseInt(this.$(handleClass).css('width')), this.get('size'));
});

test('Vertical: offset and size get routed properly', function(assert) {
  assert.expect(2);

  this.setProperties({
    size: 40,
    offset: 10
  });
  this.render(hbs`
    <div style="height: 50px">
    <div class="tse-scrollable vertical" >

    {{ember-scrollbar
      handleOffset=offset
      handleSize=size
      horizontal=false
      showHandle=true
    }}
    
    </div>
  </div>`);

  assert.equal(this.$(handleClass).position().top, this.get('offset'));
  assert.equal(Number.parseInt(this.$(handleClass).css('height')), this.get('size'));
});


test('click event on handle triggers startDrag, but not onJumpTo', function(assert) {
  assert.expect(1);

  this.setProperties({
    size: 40,
    offset: 10
  });
  this.on('onDragStart', function() {
    assert.ok(true);
  });
  this.on('onJumpTo', function() {
    assert.ok(false);
  });

  this.render(hbs`
    <div style="height: 50px">
    <div class="tse-scrollable horizontal" >

    {{ember-scrollbar
      handleOffset=offset
      handleSize=size
      horizontal=true
      showHandle=true
      onDragStart=(action 'onDragStart')
      onJumpTo=(action 'onJumpTo')
    }}
    
    </div>
  </div>`);

  click(handleClass);
});

test('clicking on bar triggers onJumpTo and not startDrag', function(assert) {
  assert.expect(1);

  this.setProperties({
    size: 40,
    offset: 10
  });

  this.on('onDragStart', function() {
    assert.ok(false);
  });

  this.on('onJumpTo', function() {
    assert.ok(true);
  });

  this.render(hbs`
    <div style="height: 50px">
    <div class="tse-scrollable horizontal" >

    {{ember-scrollbar
      handleOffset=offset
      handleSize=size
      horizontal=true
      showHandle=true
      onDragStart=(action 'onDragStart')
      onJumpTo=(action 'onJumpTo')
    }}
    
    </div>
  </div>`);

  // WHEN we click on the bar and not the handle
  click(barClass);
});


test('Horizontal: onJumpTo first argument is true when click to the left of handle', function(assert) {
  assert.expect(1);

  const deltaX =  9; // some number less than 10, therefore `towardsAnchor` will be true
  this.setProperties({
    size: 40,
    offset: 10
  });
  this.on('onJumpTo', function(towardsAnchor) {
    assert.ok(towardsAnchor, 'towardsAnchor should be true if going towards anchor');
  });

  this.render(hbs`
    <div style="height: 50px">
    <div class="tse-scrollable horizontal" >

    {{ember-scrollbar
      handleOffset=offset
      handleSize=size
      horizontal=true
      showHandle=true
      onJumpTo=(action 'onJumpTo')
    }}
    
    </div>
  </div>`);

  // WHEN
  const clientX = leftElementOffset(barClass) + deltaX;
  click(barClass, { clientX });

});

test('Horizontal: onJumpTo first argument is false when click to the right of handle', function(assert) {
  assert.expect(1);

  const deltaX = 30; // more than offset of 10
  this.setProperties({
    size: 40,
    offset: 10
  });
  this.on('onJumpTo', function(towardsAnchor) {
    assert.notOk(towardsAnchor, 'towardsAnchor should be false if going away from anchor');
  });

  this.render(hbs`
    <div style="height: 50px">
    <div class="tse-scrollable horizontal" >

    {{ember-scrollbar
      handleOffset=offset
      handleSize=size
      horizontal=true
      showHandle=true
      onJumpTo=(action 'onJumpTo')
    }}
    
    </div>
  </div>`);

  // WHEN
  const clientX = leftElementOffset(barClass) + deltaX;
  click(barClass, { clientX });

});


test('Vertical: onJumpTo first argument is true when click to the top of handle', function(assert) {
  assert.expect(1);

  const deltaY = 2; // less than offset of 10
  this.setProperties({
    size: 40,
    offset: 10
  });
  this.on('onJumpTo', function(towardsAnchor) {
    assert.ok(towardsAnchor, 'towardsAnchor should be true if going towards anchor');
  });

  this.render(hbs`
    <div style="height: 50px">
    <div class="tse-scrollable vertical" >

    {{ember-scrollbar
      handleOffset=offset
      handleSize=size
      horizontal=false
      showHandle=true
      onJumpTo=(action 'onJumpTo')
    }}
    
    </div>
  </div>`);

  // WHEN
  const clientY = topElementOffset(barClass) + deltaY;
  click(barClass, { clientY });

});

test('Vertical: onJumpTo first argument is false when clicking below the vertical handle', function(assert) {
  assert.expect(1);

  const deltaY = 30; // more than offset of 10
  this.setProperties({
    size: 40,
    offset: 10
  });
  this.on('onJumpTo', function(towardsAnchor) {
    assert.notOk(towardsAnchor, 'towardsAnchor should be false if going away from anchor');
  });

  this.render(hbs`
    <div style="height: 50px">
    <div class="tse-scrollable vertical" >

    {{ember-scrollbar
      handleOffset=offset
      handleSize=size
      horizontal=false
      showHandle=true
      onJumpTo=(action 'onJumpTo')
    }}
    
    </div>
  </div>`);

  // WHEN
  const clientY = topElementOffset(barClass) + deltaY;
  click(barClass, { clientY });

});


test('mouseup event triggers onDragEnd', function(assert) {
  assert.expect(1);

  this.setProperties({
    size: 40,
    offset: 10
  });
  let called = false;
  this.on('onDragEnd', function() {
    called = true;
  });

  this.render(hbs`
    <div style="height: 50px">
    <div class="tse-scrollable horizontal" >

    {{ember-scrollbar
      handleOffset=offset
      handleSize=size
      horizontal=true
      showHandle=true
      onDragEnd=(action 'onDragEnd')
    }}
    
    </div>
  </div>`);

  triggerEvent(handleClass, 'mouseup');

  assert.ok(called);
});


test('Vertical: onDrag is called when a change occurs when onDragging is true and mouseOffset exists', function(assert) {
  assert.expect(1);

  this.setProperties({
    size: 40,
    offset: 10,
    isDragging: false
  });

  this.on('onDrag', function() {
    // THEN
    assert.ok(true);
  });

  this.render(hbs`
    <div style="height: 50px">
    <div class="tse-scrollable vertical" >

    {{ember-scrollbar
      handleOffset=offset
      handleSize=size
      horizontal=false
      dragOffset=30
      mouseOffset=300
      isDragging=isDragging
      showHandle=true
      onDrag=(action 'onDrag')
    }}
    
    </div>
  </div>`);

  // WHEN
  this.set('isDragging', true);

});

test('Horizontal: onDrag is called when a change occurs when onDragging is true and mouseOffset exists', function(assert) {
  assert.expect(1);

  this.setProperties({
    size: 40,
    offset: 10,
    isDragging: false
  });
  this.on('onDrag', function() {
    // THEN
    assert.ok(true);
  });

  this.render(hbs`
    <div style="height: 50px">
    <div class="tse-scrollable horizontal" >

    {{ember-scrollbar
      handleOffset=offset
      handleSize=size
      horizontal=true
      dragOffset=30
      mouseOffset=300
      isDragging=isDragging
      showHandle=true
      onDrag=(action 'onDrag')
    }}
    
    </div>
  </div>`);

  // WHEN
  this.set('isDragging', true);

});

// TODO verify that the drag percentage is calculated from mouse offset and drag offset and is a percentage between 0 and 1 of the scrollbar size
