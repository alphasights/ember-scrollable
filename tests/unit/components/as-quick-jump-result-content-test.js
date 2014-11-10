import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('as-quick-jump-result-content', 'AsQuickJumpResultContentComponent', {
});

test('it renders', function() {
  expect(2);

  var component = this.subject();
  equal(component._state, 'preRender');

  this.append();
  equal(component._state, 'inDOM');
});
