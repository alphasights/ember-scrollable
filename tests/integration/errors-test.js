import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import testHelper from '../test-helper';

QUnit.module("Errors", testHelper);

test("Request error message", function(assert) {
  defineFixture('GET', '/quick_jumps', { params: { q: 'example' }, status: 500 });
  defineFixture('GET', '/users/me', { response: {
    "user": {
      "id": 6565427,
      "avatar_url": "",
      "name": "Sarah Saltz",
      "time_zone": "America/New_York",
      "initials": "SSa",
      "team_id": 136,
      "developer": false
    }
  }});

  defineFixture('GET', '/teams', { response: {
    "teams": [
      {
        "name" : "NYSC18 - The McKountry Klub",
        "id": 136,
        "office": "New York"
      }
    ]
  }});

  visit('/');
  click('.quick-jump .bar input');
  fillIn('.quick-jump .bar input', 'example');

  andThen(function() {
    var message = $('.messenger .messenger-message-inner').first().text().trim();
    assert.equal(message, "Something went wrong with that request, please try again.");
  });
});

test("First load error message", function(assert) {
  defineFixture('GET', '/users/me', { status: 500 });

  visit('/');

  andThen(function() {
    var message = $('.error h1').text().trim();
    assert.equal(message, "Sorry, something went wrong. Try refreshing the page.");
  });
});

test("Transition error message", function(assert) {
  defineFixture('GET', '/teams', { status: 500 });

  visit('/');
  visit('/team');

  andThen(function() {
    var message = $('.error h1').text().trim();
    assert.equal(message, "Sorry, something went wrong. Try refreshing the page.");
  });
});

// test("404 error message", function(assert) {
//   defineFixture('GET', '/teams', { status: 404 });
//   defineFixture('GET', '/users', { params: { team_id: 1 } });
//
//   visit('/teams/9999/projects');
//
//   andThen(function() {
//     var message = $('.error h1').text().trim();
//     assert.equal(message, "Sorry, the page you were looking for could not be found.");
//   });
// });
