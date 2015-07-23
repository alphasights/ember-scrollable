import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import Fixtures from '../helpers/fixtures';
import testHelper from '../test-helper';

QUnit.module("Labs", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);
  },

  afterEach: function() {
    testHelper.afterEach.apply(this, arguments);
  }
});

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
