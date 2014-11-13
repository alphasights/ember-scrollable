import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import testHelper from '../test-helper';

module("Team", {
  setup: function() {
    testHelper.setup.apply(this, arguments);

    defineFixture('/teams', {}, {
      "teams": [{
        "name": "Example Team",
        "id": 1,
        "office": "Example Office"
      }]
    });

    defineFixture('/projects', { team_id: '1' }, {
      "angles": [{
        "id": 1,
        "title": "Angle 1",
        "project_id": 1,
        "angle_team_membership_ids": [1]
      },{
        "id": 2,
        "title": "Angle 2",
        "project_id": 2,
        "angle_team_membership_ids": [2]
      }],

      "angle_team_memberships": [{
        "target_value": 4,
        "id": 1,
        "created_at": "2014-07-09T16:46:03.347+01:00",
        "angle_id": 1,
        "team_member_id": 1
      },{
        "target_value": 4,
        "id": 2,
        "created_at": "2014-07-09T16:46:03.347+01:00",
        "angle_id": 2,
        "team_member_id": 1
      }],

      "projects": [{
        "id": 1,
        "status": "high",
        "name": "Example Project",
        "client_code": "EP",
        "details_url": "/projects/1",
        "created_at": "2009-07-14T17:05:32.909+01:00",
        "angle_ids": [1],
        "analyst_1_id": 1,
        "proposed_advisors_count": 1,
        "left_to_schedule_advisors_count": 0,
        "upcoming_interactions_count": 0
      }, {
        "id": 2,
        "status": "medium",
        "name": "Example Project 2",
        "client_code": "2EP",
        "details_url": "/projects/2",
        "created_at": "2008-07-14T17:05:32.909+01:00",
        "angle_ids": [2],
        "analyst_1_id": 1,
        "proposed_advisors_count": 1,
        "left_to_schedule_advisors_count": 0,
        "upcoming_interactions_count": 0
      }]
    });
  },

  teardown: function() {
    testHelper.teardown.apply(this, arguments);
  }
});

test("Read project list", function() {
  visit('/team');
  wait();

  andThen(function() {
    equal(find('.project:first h1 span').text().trim(), 'Example Project');
    equal(find('.project:first h1 small').text().trim(), 'EP');
    equal(find('.project:first .priority.high').length, 1);
    equal(find('.project:first .members .avatar').prop('src'), 'http://example.com/avatar.png');
    equal(find('.project:first .members .avatar.lead').prop('src'), 'http://example.com/avatar.png');
    equal(find('.project:first .progress .delivered .count').text().trim(), 1);
    equal(find('.project:first .progress .target .count').text().trim(), 4);
    equal(find('.project:first .progress .progress-bar > div').prop('style').width, '25%');
  });
});

test("Sort project list", function() {
  visit('/team');

  fillIn('.projects header .sort-by-select select', 'client');

  andThen(function() {
    var projects = find('.project').toArray().map(function(project) {
      var $project = $(project);

      return $project.find('h1 span').text().trim();
    });

    deepEqual(projects, ['Example Project 2', 'Example Project']);
  });
});
