import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import Fixtures from '../helpers/fixtures';
import testHelper from '../test-helper';

QUnit.module("Labs", testHelper);

test("Create New Lab", function(assert) {
  defineFixture('GET', '/v1/features', { response: {
    "features": [],
    "current_user_feature_participations": []
  }});

  defineFixture('GET', '/badges', { response: {
    "badges": [
      "advisor_charity",
      "wine_connoisseur"
    ]
  }});

  defineFixture('POST', '/v1/features', { request: {
    "feature": {
      "badge_name": "wine_connoisseur",
      "brief_description": "Business Business Business",
      "limit": 100,
      "name": "<3 Junior Achievement"
    }
  }});

  visit('/labs');

  andThen(function() {
    assert.equal(currentURL(), '/labs');
  });

  click("a:contains('New Lab')");

  andThen(function() {
    assert.equal(currentURL(), '/labs/new');
  });

  fillIn('input[name=name]', "<3 Junior Achievement");
  select('.form-select select[name=badgeName]', 'Wine Connoisseur');
  fillIn('input[name=briefDescription]',  "Business Business Business");
  click('input[name=showLimit]');
  fillIn('input[name=limit]', "100");
  click("button:contains('Create Lab')");

  andThen(function() {
    assert.equal(currentURL(), '/labs');
  });
});
