import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import '../helpers/select';
import Fixtures from '../helpers/fixtures';
import testHelper from '../test-helper';

module("Team", {
  setup: function() {
    testHelper.setup.apply(this, arguments);

    defineFixture('GET', '/teams', { response: {
      "teams": [{
        "name": "Example Team",
        "id": 1,
        "office": "Example Office"
      }, {
        "name": "Example Team 2",
        "id": 2,
        "office": "Example Office"
      }]
    }});

    defineFixture('GET', '/projects', { params: { team_id: '1' }, response: {
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
        "left_to_schedule_advisors_count": 0,
        "upcoming_interactions_count": 0
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
        "left_to_schedule_advisors_count": 0,
        "upcoming_interactions_count": 0
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
        "upcoming_interactions_count": 0
      }]
    }});

    defineFixture('GET', '/projects', { params: { team_id: '2' }, response: {
      "users": [],

      "projects": [{
        "id": 4,
        "status": "high",
        "name": "Example Project 4",
        "client_code": "EP",
        "details_url": "/projects/4",
        "created_at": "2009-07-14T17:05:32.909+01:00",
        "angle_ids": [],
        "analyst_1_id": 1,
        "proposed_advisors_count": 0,
        "left_to_schedule_advisors_count": 0,
        "upcoming_interactions_count": 0
      }],

      "angles": [],
      "angle_team_memberships": []
    }});

    defineFixture('GET', '/users', { params: { team_id: '1' }, response: {
      "users": [{
        "initials": "EU3",
        "id": 3,
        "teamId": 1,
        "avatarUrl": Fixtures.EMPTY_IMAGE_URL
      }]
    }});

    defineFixture('GET', '/users', { params: { team_id: '2' }, response: {
      "users": []
    }});
  },

  teardown: function() {
    testHelper.teardown.apply(this, arguments);
  }
});

test("Read project list", function() {
  visit('/teams');
  wait();

  andThen(function() {
    var projects = find('.project-list-item').toArray().map(function(project) {
      var $project = $(project);

      return {
        title: $project.find('h1 span').text().trim(),
        clientCode: $project.find('h1 small').text().trim(),
        highPriority: $project.find('.priority-select .dropdown > .high').length === 1,
        mediumPriority: $project.find('.priority-select .dropdown > .medium').length === 1,
        lowPriority: $project.find('.priority-select .dropdown > .low').length === 1,
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
      memberAvatarUrl: Fixtures.EMPTY_IMAGE_URL,
      leadAvatarUrl: Fixtures.EMPTY_IMAGE_URL,
      deliveredCount: 1,
      targetCount: 4,
      progressBarWidth: '25%'
    }, {
      title: 'Example Project 2',
      clientCode: '2EP',
      highPriority: true,
      mediumPriority: false,
      lowPriority: false,
      memberAvatarUrl: undefined,
      leadAvatarUrl: Fixtures.EMPTY_IMAGE_URL,
      deliveredCount: 1,
      targetCount: 2,
      progressBarWidth: '50%'
    }, {
      title: 'Example Project 3',
      clientCode: '03EP',
      highPriority: false,
      mediumPriority: true,
      lowPriority: false,
      memberAvatarUrl: undefined,
      leadAvatarUrl: Fixtures.EMPTY_IMAGE_URL,
      deliveredCount: 0,
      targetCount: 0,
      progressBarWidth: '0px',
    }]);
  });
});

test("Sort project list", function() {
  visit('/teams');

  var projectTitles = function() {
    return find('.project-list-item').toArray().map(function(project) {
      return $(project).find('h1 span').text().trim();
    });
  };

  fillIn('.team .sort-by-select select', 'client');

  andThen(function() {
    deepEqual(
      projectTitles(),
      ['Example Project 2', 'Example Project', 'Example Project 3']
    );
  });

  fillIn('.team .sort-by-select select', 'creation-date');

  andThen(function() {
    deepEqual(
      projectTitles(),
      ['Example Project', 'Example Project 2', 'Example Project 3']
    );
  });
});

test("Change project priority", function() {
  var handler = defineFixture('PUT', '/projects/1', { request: {
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
  }});

  visit('/teams');
  click('.project-list-item:first .priority-select .dropdown');
  click('.project-list-item:first .priority-select ul > .low');

  andThen(function() {
    equal(handler.called, true);
    equal(find('.project-list-item:last .priority-select .dropdown > .low').length, 1);
  });
});

test("Show project details", function() {
  visit('/teams');
  click('.project-list-item:first');

  andThen(function(){
    var $project = find('.project');
    var $angle = $project.find('.angles article');

    var projectDetails = {
      title: $project.find('h1 span').text().trim(),
      highPriority: $project.find('.priority-select .dropdown > .high').length === 1,
      mediumPriority: $project.find('.priority-select .dropdown > .medium').length === 1,
      lowPriority: $project.find('.priority-select .dropdown > .low').length === 1,

      angle: {
        title: $angle.find('> h3').text().trim(),

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
          avatarUrl: Fixtures.EMPTY_IMAGE_URL,
          deliveryTarget: '4'
        }, {
          avatarUrl: Fixtures.EMPTY_IMAGE_URL,
          deliveryTarget: '0'
        }]
      }
    });
  });
});

test("Navigate to next project with navigation buttons", function() {
  visit('/teams');
  click('.project-list-item:first');
  click('.project .next');

  andThen(function(){
    equal(find('.project h1 span').text().trim(), 'Example Project 2');
  });
});

test("Navigate to next project with arrow keys", function() {
  visit('/teams');
  click('.project-list-item:first');
  keyEvent(document, 'keyup', 39);

  andThen(function(){
    equal(find('.project h1 span').text().trim(), 'Example Project 2');
  });
});

test("Navigate to previous project with navigation buttons", function() {
  visit('/teams');
  click('.project-list-item:last');
  click('.project .previous');

  andThen(function(){
    equal(find('.project h1 span').text().trim(), 'Example Project 2');
  });
});

test("Navigate to previous project with arrow keys", function() {
  visit('/teams');
  click('.project-list-item:last');
  keyEvent(document, 'keyup', 37);

  andThen(function(){
    equal(find('.project h1 span').text().trim(), 'Example Project 2');
  });
});

test("Move back to the last project from the first", function() {
  visit('/teams');
  click('.project-list-item:first');
  click('.project .previous');

  andThen(function(){
    equal(find('.project h1 span').text().trim(), 'Example Project 3');
  });
});

test("Move back to the first project from the last", function() {
  visit('/teams');
  click('.project-list-item:last');
  click('.project .next');

  andThen(function(){
    equal(find('.project h1 span').text().trim(), 'Example Project');
  });
});

test("Change project priority from the details", function() {
  var handler = defineFixture('PUT', '/projects/1', { request: {
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
  }});

  visit('/teams');
  click('.project-list-item:first');
  click('.project .priority-select .dropdown');
  click('.project .priority-select ul > .low');

  andThen(function() {
    equal(handler.called, true);
    equal(find('.project-list-item:last .priority-select .dropdown > .low').length, 1);
  });
});

test("Change delivery target for an angle membership", function() {
  var handler = defineFixture('PUT', '/angle_team_memberships/1', { request: {
    "angle_team_membership": {
      "target_value": 6,
      "angle_id": "1",
      "team_member_id": "1"
    }
  }});

  visit('/teams');
  click('.project-list-item:first');
  fillIn('.angle-memberships > ul article:first .delivery-target input', '6');

  andThen(function() {
    equal(handler.called, true);
  });
});

test("Add a member to an angle", function() {
  var handler = defineFixture('POST', '/angle_team_memberships', { request: {
    "angle_team_membership": {
      "target_value": 0,
      "angle_id": "1",
      "team_member_id": "3"
    }
  }});

  visit('/teams');
  click('.project-list-item:first');
  click('.angle-memberships .add > button');
  click('.angle-memberships .add .team-members li');

  andThen(function() {
    equal(handler.called, true);
    equal(find('.angle-memberships > ul article').length, 3);
  });
});

test("Remove a member from an angle", function() {
  var handler = defineFixture('DELETE', '/angle_team_memberships/1');

  visit('/teams');
  click('.project-list-item:first');
  click('.angle-memberships > ul article:first .remove');

  andThen(function() {
    equal(handler.called, true);
    equal(find('.angle-memberships > ul article').length, 1);
  });
});

test("Change selected team", function() {
  visit('/teams');

  click('.team-select button');
  select('.team-select option:last');

  andThen(function() {
    equal(find('.project-list-item h1 span').text().trim(), 'Example Project 4');
  });
});
