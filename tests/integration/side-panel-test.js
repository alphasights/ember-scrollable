import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import testHelper from '../test-helper';

module("Side Panel", {
  setup: function() {
    testHelper.setup.apply(this, arguments);

    defineFixture('GET', '/teams', { response: {
      "teams": [{
        "name": "Example Team",
        "id": 1,
        "office": "Example Office"
      }]
    }});

    defineFixture('GET', '/projects', { params: { team_id: '1' }, response: {
      "projects": [{
        "id": 1,
        "status": "high",
        "name": "Example Project",
        "client_code": "EP",
        "details_url": "/projects/1",
        "created_at": "2009-07-14T17:05:32.909+01:00",
        "angle_ids": [],
        "analyst_1_id": 1,
        "proposed_advisors_count": 0,
        "left_to_schedule_advisors_count": 0,
        "upcoming_interactions_count": 0
      }]
    }});

    defineFixture('GET', '/users', { params: { team_id: '1' }, response: {
      "users": []
    }});
  },

  teardown: function() {
    testHelper.teardown.apply(this, arguments);
  }
});

test("Shows", function() {
  visit('/teams');
  click('.project-list-item');

  andThen(function() {
    equal(find('.side-panel.active h1 span').text().trim(), 'Example Project');
  });
});

test("Hides when clicking on the overlay", function() {
  visit('/teams');
  click('.project-list-item');
  click('.side-panel');

  andThen(function() {
    equal(find('.side-panel').length, 0);
  });
});

test("Hides when clicking on the close button", function() {
  visit('/teams');
  click('.project-list-item');
  click('.close > button');

  andThen(function() {
    equal(find('.side-panel').length, 0);
  });
});

test("Hides when pressing the esc key", function() {
  visit('/teams');
  click('.project-list-item');
  keyEvent(document, 'keyup', 27);

  andThen(function() {
    equal(find('.side-panel').length, 0);
  });
});
