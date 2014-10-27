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

// test('it animates into the viewport', function() {
//   var component = this.subject();
//
//   equal(this.$().find('.panel').position().right, '-40%');
// });

// test('it closes', function() {
//   var component = this.subject();
//
//   this.append();
// });
