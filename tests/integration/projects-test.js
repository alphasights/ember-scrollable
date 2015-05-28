import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import Fixtures from '../helpers/fixtures';
import testHelper from '../test-helper';

QUnit.module("Projects", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    defineFixture('GET', '/projects', { params: { user_id: '1', all_time: 'true' }, response: {
      "users": [{
        "initials": "EU2",
        "id": 2,
        "teamId": 1,
        "avatarUrl": Fixtures.EMPTY_IMAGE_URL
      }],

      "angles": [{
        "id": 1,
        "title": "Angle 1",
        "project_id": 1,
        "angle_team_membership_ids": [1, 2]
      }, {
        "id": 2,
        "title": "Angle 2",
        "project_id": 2,
        "angle_team_membership_ids": [3]
      }],

      "angle_team_memberships": [{
        "target_value": 4,
        "id": 1,
        "created_at": "2014-07-09T16:46:03.347+01:00",
        "angle_id": 1,
        "team_member_id": 1
      }, {
        "target_value": 0,
        "id": 2,
        "created_at": "2014-07-09T16:46:04.347+01:00",
        "angle_id": 1,
        "team_member_id": 2
      }, {
        "target_value": 2,
        "id": 3,
        "created_at": "2014-07-09T16:46:05.347+01:00",
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
        "left_to_schedule_advisors_count": 4,
        "upcoming_interactions_count": 2,
        "codename": "Chocolate 1"
      }, {
        "id": 2,
        "status": "high",
        "name": "Example Project 2",
        "client_code": "2EP",
        "details_url": "/projects/2",
        "created_at": "2008-07-14T17:05:32.909+01:00",
        "angle_ids": [2],
        "analyst_1_id": 1,
        "proposed_advisors_count": 1,
        "left_to_schedule_advisors_count": 7,
        "upcoming_interactions_count": 4,
        "codename": "Chocolate 2"
      }, {
        "id": 3,
        "status": "medium",
        "name": "Example Project 3",
        "client_code": "03EP",
        "details_url": "/projects/3",
        "created_at": "2008-07-14T17:05:32.909+01:00",
        "angle_ids": [],
        "analyst_1_id": 1,
        "proposed_advisors_count": 0,
        "left_to_schedule_advisors_count": 0,
        "upcoming_interactions_count": 0,
        "codename": "Chocolate 3"
      }]
    }});
  },

  afterEach: function() {
    testHelper.afterEach.apply(this, arguments);
  }
});

test("Read project list", function(assert) {
  visit('/projects');

  andThen(function() {
    var projects = find('.project-list-item').toArray().map(function(project) {
      var $project = $(project);

      return {
        title: $project.find('> .details .name').text().trim(),
        codename: $project.find('> .details .codename').text().trim(),
        clientCode: $project.find('> .details small').text().trim(),
        memberAvatarUrl: $project.find('.members .avatar:not(.lead)').prop('src'),
        leadAvatarUrl: $project.find('.members .avatar.lead').prop('src'),
        deliveredCount: $project.find('.delivered').text().trim(),
        upcomingCount: $project.find('.upcoming').text().trim(),
        requestedCount: $project.find('.requested').text().trim()
      };
    });

    assert.deepEqual(projects, [{
      title: 'Example Project',
      codename: 'Chocolate 1',
      clientCode: 'EP',
      memberAvatarUrl: Fixtures.EMPTY_IMAGE_URL,
      leadAvatarUrl: Fixtures.EMPTY_IMAGE_URL,
      deliveredCount: '1 Delivered',
      upcomingCount: '2 Upcoming',
      requestedCount: '4 Requested'
    }, {
      title: 'Example Project 2',
      codename: 'Chocolate 2',
      clientCode: '2EP',
      memberAvatarUrl: undefined,
      leadAvatarUrl: Fixtures.EMPTY_IMAGE_URL,
      deliveredCount: '1 Delivered',
      upcomingCount: '4 Upcoming',
      requestedCount: '7 Requested'
    }]);
  });
});
