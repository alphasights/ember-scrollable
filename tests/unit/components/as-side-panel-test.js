import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('as-side-panel', 'AsSidePanelComponent');

test('it renders', function() {
  var component = this.subject();
  equal(component._state, 'preRender');

  this.append();
  equal(component._state, 'inDOM');
});
