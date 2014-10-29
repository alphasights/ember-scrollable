import Ember from 'ember';

import {
  moduleForComponent,
  test
} from 'ember-qunit';

import '../helpers/define-fixture';
import startApp from '../helpers/start-app';

moduleForComponent('as-side-panel', 'AsSidePanelComponent', {
  setup: function() {
    window.app = startApp();
  },

  teardown: function() {
    Ember.run(window.app, window.app.destroy);
  }
});

test('it starts outside of the viewport', function() {
  var component = this.subject();
  var $component = this.append();

  notEqual(parseInt($component.find('.panel').css('right'), 10), 0)
  equal(parseInt($component.find('.panel').css('right'), 10), -($component.find('.panel').width()));
});

// test('it animates into the viewport', function() {
//   var component = this.subject();
//   var $component = this.append();
//
//   andThen(function(){
//     equal(parseInt($component.find('.panel').css('right'), 10), 0);
//   });
// });
//
// test('it closes', function() {
//   var component = this.subject();
//   var $component = this.append();
//
//   click('.overlay');
//
//   andThen(function(){
//     equal($component.find('.panel').css('right'), '0px');
//   });
// });
