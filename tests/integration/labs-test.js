import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import Fixtures from '../helpers/fixtures';
import testHelper from '../test-helper';

const feature = {
  id: 1,
  badgeName: "wine_connoisseur",
  briefDescription: "Business Business Business",
  limit: 100,
  name: "<3 Junior Achievement",
  featureParticipationsCount: 0
};

QUnit.module("Labs", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    defineFixture('GET', '/badges', { response: {
      "badges": [
        "advisor_charity",
        "wine_connoisseur"
      ]
    }});
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

  let handler = defineFixture('POST', '/v1/features', { request: {
    "feature": {
      "badge_name": feature.badgeName,
      "brief_description": feature.briefDescription,
      "limit": feature.limit,
      "name": feature.name
    }
  }});

  visit('/labs');
  click("a:contains('New Lab')");

  andThen(function() {
    assert.equal(currentURL(), '/labs/new');
  });

  fillIn('input[name=name]', feature.name);
  select('.form-select select[name=badgeName]', "Wine Connoisseur");
  fillIn('input[name=briefDescription]', feature.briefDescription);
  click('input[name=showLimit]');
  fillIn('input[name=limit]', feature.limit);
  click("button:contains('Create Lab')");

  andThen(function() {
    assert.equal(currentURL(), '/labs');
    assert.equal($('h1.name').text().trim(), '<3 Junior Achievement');
    assert.equal(handler.called, true);
  });
});

test("Edit Lab", function(assert) {
  defineFixture('GET', '/v1/features', {response: {
    "features": [
      {
        "id": feature.id,
        "badge_name": feature.badgeName,
        "brief_description": feature.briefDescription,
        "limit": feature.limit,
        "name": feature.name,
        "feature_participations_count": feature.featureParticipationsCount
      }
    ],
    "current_user_feature_participations": []
  }});

  let handler = defineFixture('PUT', `/v1/features/${feature.id}`, { request: {
    "feature": {
      "badge_name": feature.badgeName,
      "brief_description": feature.briefDescription,
      "limit": feature.limit,
      "name": "Really <3 Junior Achievement"
    }
  }});

  visit('/labs');
  click("a:contains('Edit')");

  andThen(function() {
    assert.equal(currentURL(), `/labs/${feature.id}/edit`);
  });

  fillIn('input[name=name]', "Really <3 Junior Achievement");
  click("button:contains('Save')");

  andThen(function() {
    assert.equal(currentURL(), '/labs');
    assert.equal($('h1.name').text().trim(), 'Really <3 Junior Achievement');
    assert.equal(handler.called, true);
  });
});

test("Join Lab", function(assert) {
  defineFixture('GET', '/v1/features', { response: {
    "features": [
      {
        "id": feature.id,
        "badge_name": feature.badgeName,
        "brief_description": feature.briefDescription,
        "limit": feature.limit,
        "name": feature.name,
        "feature_participations_count": feature.featureParticipationsCount
      }
    ],
    "current_user_feature_participations": []
  }});

  let handler = defineFixture('POST', '/v1/feature_participations', {
    request: {
      "feature_participation": {
        "feature_id": feature.id.toString(),
        "user_id": "1"
      }
    },

    response: {
      "feature_participation": {
        "id": 1,
        "feature_id": feature.id,
        "user_id": 1
      },

      "features": [
        {
          "id": feature.id,
          "badge_name": feature.badgeName,
          "brief_description": feature.briefDescription,
          "limit": feature.limit,
          "name": feature.name,
          "feature_participations_count": 1
        }
      ]
    }
  });

  visit('/labs');
  click("button:contains('Join')");

  andThen(function() {
    assert.equal($('.participate span').first().text().trim(), '1 participants.');
    assert.equal(handler.called, true);
  });
});

const featureParticipation = {
  id: 1,
  userId: 1
};

test("Leave Lab", function(assert) {
  defineFixture('GET', '/v1/features', { response: {
    "features": [
      {
        "id": feature.id,
        "badge_name": feature.badgeName,
        "brief_description": feature.briefDescription,
        "limit": feature.limit,
        "name": feature.name,
        "feature_participations_count": 1
      }
    ],
    "current_user_feature_participations": [
      {
        "id": featureParticipation.id,
        "feature_id": feature.id,
        "user_id": featureParticipation.userId
      }
    ]
  }});

  let handler = defineFixture('DELETE', `/v1/feature_participations/${featureParticipation.id}`, {
    response: {
      "feature_participation": {
        "id": featureParticipation.id,
        "feature_id": feature.id,
        "user_id": featureParticipation.userId
      },

      "features": [
        {
          "id": feature.id,
          "badge_name": feature.badgeName,
          "brief_description": feature.briefDescription,
          "limit": feature.limit,
          "name": feature.name,
          "feature_participations_count": 1
        }
      ]
    }
  });

  visit('/labs');
  click("button:contains('Leave')");

  andThen(function() {
    assert.equal($('.participate span').first().text().trim(), '0 participants.');
    assert.equal(handler.called, true);
  });
});
