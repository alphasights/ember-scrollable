import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import '../helpers/request-watcher';
import fixtures from '../helpers/fixtures';
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
      "users": [{
        "initials": "EU2",
        "id": 2,
        "teamId": 1,
        "avatarUrl": fixtures.EMPTY_IMAGE_URL
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

    defineFixture('/users', { team_id: '1' }, {
      "users": [{
        "initials": "EU3",
        "id": 3,
        "teamId": 1,
        "avatarUrl": fixtures.EMPTY_IMAGE_URL
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
    var projects = find('.project-list-item').toArray().map(function(project) {
      var $project = $(project);

      return {
        title: $project.find('h1 span').text().trim(),
        clientCode: $project.find('h1 small').text().trim(),
        highPriority: $project.find('.priority-select > .high').length === 1,
        mediumPriority: $project.find('.priority-select > .medium').length === 1,
        lowPriority: $project.find('.priority-select > .low').length === 1,
        memberAvatarUrl: $project.find('.members .avatar:not(.lead)').prop('src'),
        leadAvatarUrl: $project.find('.members .avatar.lead').prop('src'),
        deliveredCount: parseInt($project.find('.progress .delivered .count').text().trim(), 10),
        targetCount: parseInt($project.find('.progress .target .count').text().trim(), 10),
        progressBarWidth: $project.find('.progress .progress-bar > div').prop('style').width
      };
    });

    deepEqual(projects, [{
      title: 'Example Project',
      clientCode: 'EP',
      highPriority: true,
      mediumPriority: false,
      lowPriority: false,
      memberAvatarUrl: fixtures.EMPTY_IMAGE_URL,
      leadAvatarUrl: fixtures.EMPTY_IMAGE_URL,
      deliveredCount: 1,
      targetCount: 4,
      progressBarWidth: '25%'
    }, {
      title: 'Example Project 2',
      clientCode: '2EP',
      highPriority: false,
      mediumPriority: true,
      lowPriority: false,
      memberAvatarUrl: undefined,
      leadAvatarUrl: fixtures.EMPTY_IMAGE_URL,
      deliveredCount: 1,
      targetCount: 2,
      progressBarWidth: '50%'
    }]);
  });
});

test("Sort project list", function() {
  visit('/team');

  var projectTitles = function() {
    return find('.project-list-item').toArray().map(function(project) {
      return $(project).find('h1 span').text().trim();
    });
  };

  fillIn('.projects .sort-by-select select', 'client');

  andThen(function() {
    deepEqual(projectTitles(), ['Example Project 2', 'Example Project']);
  });

  fillIn('.projects .sort-by-select select', 'creation-date');

  andThen(function() {
    deepEqual(projectTitles(), ['Example Project', 'Example Project 2']);
  });

  fillIn('.projects .sort-by-select select', 'priority');

  andThen(function() {
    deepEqual(projectTitles(), ['Example Project', 'Example Project 2']);
  });
});

test("Change project priority", function() {
  var watcher = requestWatcher('put', '/projects/1', {}, {
    "project": {
      "client_code": "EP",
      "details_url": "/projects/1",
      "left_to_schedule_advisors_count": 0,
      "name": "Example Project",
      "proposed_advisors_count": 1,
      "status": "low",
      "upcoming_interactions_count": 0,
      "analyst_1_id": "1"
    }
  }, {});

  visit('/team');
  click('.project-list-item:first .priority-select');
  click('.project-list-item:first .priority-select .dropdown-item.low');

  andThen(function() {
    equal(watcher.called, true);
    equal(find('.project-list-item:last .priority-select > .low').length, 1);
  });
});

test("Show project details", function() {
  visit('/team');
  click('.project-list-item:first');

  andThen(function(){
    var $project = find('.project');
    var $angle = $project.find('.angles article');

    var projectDetails = {
      title: $project.find('h1 span').text().trim(),
      highPriority: $project.find('.priority-select > .high').length === 1,
      mediumPriority: $project.find('.priority-select > .medium').length === 1,
      lowPriority: $project.find('.priority-select > .low').length === 1,

      angle: {
        title: $angle.find('> h1').text().trim(),

        memberships: $angle.find('.angle-memberships > ul article').toArray().map(function(membership) {
          var $membership = $(membership);

          return {
            avatarUrl: $membership.find('.avatar').prop('src'),
            deliveryTarget: $membership.find('.delivery-target input').val()
          };
        })
      }
    };

    deepEqual(projectDetails, {
      title: 'Example Project',
      highPriority: true,
      mediumPriority: false,
      lowPriority: false,

      angle: {
        title: 'Angle 1',

        memberships: [{
          avatarUrl: fixtures.EMPTY_IMAGE_URL,
          deliveryTarget: '4'
        }, {
          avatarUrl: fixtures.EMPTY_IMAGE_URL,
          deliveryTarget: '0'
        }]
      }
    });
  });
});

test("Navigate to next project", function() {
  visit('/team');
  click('.project-list-item:first');
  click('.project .next');

  andThen(function(){
    equal(find('.project h1 span').text().trim(), 'Example Project 2');
  });
});

test("Navigate to previous project", function() {
  visit('/team');
  click('.project-list-item:last');
  click('.project .previous');

  andThen(function(){
    equal(find('.project h1 span').text().trim(), 'Example Project');
  });
});

test("Move back to the last project from the first", function() {
  visit('/team');
  click('.project-list-item:first');
  click('.project .previous');

  andThen(function(){
    equal(find('.project h1 span').text().trim(), 'Example Project 2');
  });
});

test("Move back to the first project from the last", function() {
  visit('/team');
  click('.project-list-item:last');
  click('.project .next');

  andThen(function(){
    equal(find('.project h1 span').text().trim(), 'Example Project');
  });
});

test("Change project priority from the details", function() {
  var watcher = requestWatcher('put', '/projects/1', {}, {
    "project": {
      "client_code": "EP",
      "details_url": "/projects/1",
      "left_to_schedule_advisors_count": 0,
      "name": "Example Project",
      "proposed_advisors_count": 1,
      "status": "low",
      "upcoming_interactions_count": 0,
      "analyst_1_id": "1"
    }
  }, {});

  visit('/team');
  click('.project-list-item:first');
  click('.project .priority-select');
  click('.project .priority-select .dropdown-item.low');

  andThen(function() {
    equal(watcher.called, true);
    equal(find('.project-list-item:last .priority-select > .low').length, 1);
  });
});

test("Change delivery target for an angle membership", function() {
  var watcher = requestWatcher('put', '/angle_team_memberships/1', {}, {
    "angle_team_membership": {
      "target_value": 6,
      "angle_id": "1",
      "team_member_id": "1"
    }
  }, {});

  visit('/team');
  click('.project-list-item:first');
  fillIn('.angle-memberships > ul article:first .delivery-target input', '6');

  andThen(function() {
    equal(watcher.called, true);
  });
});

test("Add a member to an angle", function() {
  var watcher = requestWatcher('post', '/angle_team_memberships', {}, {
    "angle_team_membership": {
      "target_value": 0,
      "angle_id": "1",
      "team_member_id": "3"
    }
  }, {});

  visit('/team');
  click('.project-list-item:first');
  click('.angle-memberships .add > button');
  click('.angle-memberships .add .team-members li');

  andThen(function() {
    equal(watcher.called, true);
    equal(find('.angle-memberships > ul article').length, 3);
  });
});

test("Remove a member from an angle", function() {
  var watcher = requestWatcher('delete', '/angle_team_memberships/1', {}, null, null);

  visit('/team');
  click('.project-list-item:first');
  click('.angle-memberships > ul article:first .remove');

  andThen(function() {
    equal(watcher.called, true);
    equal(find('.angle-memberships > ul article').length, 1);
  });
});
