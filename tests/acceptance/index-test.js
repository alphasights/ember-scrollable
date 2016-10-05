import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

const zoom = 0.5;

moduleForAcceptance('Acceptance | ember-scrollbar');

test('vertical scrollbar', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');

    assert.ok($('.vertical-demo .ember-scrollable').length, 'vertical demo rendered');
    assert.ok($('.vertical-demo .ember-scrollable .drag-handle').length, 'vertical demo handle rendered');
  });

});

test('resizable scrollbar', function(assert) {
  visit('/');

  andThen(function() {
    assert.ok($('.resize-demo .ember-scrollable').length, 'resize demo rendered');
    assert.ok($('.resize-demo .ember-scrollable .drag-handle').length, 'resize handle rendered');
    assert.equal($('.resize-demo .ember-scrollable').height(), 200 * zoom);
  });

  click('button:contains(Make Tall)');

  andThen(function(){
    assert.equal($('.resize-demo .ember-scrollable').height(), 400 * zoom);
  });

  click('button:contains(Make Short)');

  andThen(function(){
    assert.equal($('.resize-demo .ember-scrollable').height(), 200 * zoom);
  });

});
