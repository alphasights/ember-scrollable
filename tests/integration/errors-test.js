import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import config from '../../config/environment';
import testConfig from '../test-helper';

module("Errors", testConfig);

test("Error message", function() {
  window.app.server.get(`${config.APP.apiBaseUrl}/quick_jumps`, function(request) {
    if (_({ q: 'example' }).isEqual(request.queryParams)) {
      return [
        500,
        { 'Content-Type': 'application/json' },
        JSON.stringify({ errors: "generic error"})
      ];
    }
  });

  visit('/');
  click('.quick-jump .bar input');
  fillIn('.quick-jump .bar input', 'example');

  andThen(function() {
    var message = $('.messenger .messenger-message-inner').first().text();

    equal(message, 'Something went wrong with that request, please try again.');
  });
});
