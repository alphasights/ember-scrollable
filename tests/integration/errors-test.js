import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import testHelper from '../test-helper';

module("Errors", testHelper);

test("Error message", function() {
  defineFixture('/quick_jumps', { q: 'example' }, {}, 500);

  visit('/');
  click('.quick-jump .bar input');
  fillIn('.quick-jump .bar input', 'example');

  andThen(function() {
    var message = $('.messenger .messenger-message-inner').first().text().trim();
    equal(message, 'Something went wrong with that request, please try again.');
  });
});
