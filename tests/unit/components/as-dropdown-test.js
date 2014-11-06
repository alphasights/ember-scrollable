import Ember from 'ember';

import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('as-dropdown', 'AsDropdownComponent', {
});

test('it renders', function() {
  var component = this.subject();
  equal(component._state, 'preRender');

  this.append();
  equal(component._state, 'inDOM');
});

test('it has alignment info in the data-options property', function() {
  var component = this.subject();

  Ember.run(function(){
    component.set('align', 'top');
  });

  equal(this.$().find('button').data('options'), 'align: top');
});

test('it has a data-dropdown id equal to the list id', function(){
  var component = this.subject();
  var id = `${Ember.guidFor(component)}-dropdown`;

  equal(this.$().find('button').data('dropdown'), id);
  equal(this.$().find('ul').attr('id'), id);
});

test('it has a title', function() {
  var component = this.subject();

  Ember.run(function(){
    component.set('title', 'Test Title');
  });

  equal(this.$().find('button').attr('title'), 'Test Title');
});
