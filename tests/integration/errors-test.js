import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import testHelper from '../test-helper';

module("Errors", testHelper);

test("Request error message", function() {
  defineFixture('GET', '/quick_jumps', { params: { q: 'example' }, status: 500 });

  visit('/');
  click('.quick-jump .bar input');
  fillIn('.quick-jump .bar input', 'example');

  andThen(function() {
    var message = $('.messenger .messenger-message-inner').first().text().trim();
    equal(message, "Something went wrong with that request, please try again.");
  });
});

test("First load error message", function() {
  defineFixture('GET', '/users/me', { status: 500 });

  visit('/');

  andThen(function() {
    var message = $('.error h1').text().trim();
    equal(message, "Sorry, something went wrong. Try refreshing the page.");
  });
});

test("Transition error message", function() {
  defineFixture('GET', '/teams', { status: 500 });

  visit('/');
  visit('/team');

  andThen(function() {
    var message = $('.error h1').text().trim();
    equal(message, "Sorry, something went wrong. Try refreshing the page.");
  });
});

test("404 error message", function() {
  defineFixture('/projects/99999999', {}, {}, 404);

  visit('/');
  visit('/team/99999999');

  andThen(function() {
    var message = $('.error h1').text().trim();
    equal(message, "Sorry, the page you were looking for could not be found.");
  });
});
