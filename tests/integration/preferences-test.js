import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import '../helpers/lookup';
import testHelper from '../test-helper';

QUnit.module('Preferences', {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    if (window.localStorage != null) {
      window.localStorage.clear();
    }

    defineFixture('GET', '/users/me', { response: {
      "user": {
        "id": 6565427,
        "name": "Sarah Saltz",
        "time_zone": "America/New_York",
        "initials": "SSa",
        "team_id": 136
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
  },

  afterEach: function() {
    testHelper.afterEach.apply(this, arguments);
  }
});

test('sidebarCollapsed updates when toggling the sidebar', function(assert) {
  visit('/');
  click('.toggle-collapse button');

  andThen(function() {
    assert.equal(lookup('controller:currentUser').get('preferences.sidebarCollapsed'), true);
  });
});

test('sidebarCollapsed persists on page reload', function(assert) {
  visit('/');
  click('.toggle-collapse button');
  visit('/');
  click('.toggle-collapse button');

  andThen(function() {
    assert.equal(lookup('controller:currentUser').get('preferences.sidebarCollapsed'), false);
  });
});
