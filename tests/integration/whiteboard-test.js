import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import '../helpers/drag-and-drop';
import Fixtures from '../helpers/fixtures';
import testHelper from '../test-helper';

var projectTitles = function() {
  return find('.whiteboard-project-list-item').toArray().map(function(project) {
    return $(project).find('> .details .name').text().trim();
  });
};

QUnit.module("Whiteboard", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

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
        "upcoming_interactions_count": 0,
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
        "left_to_schedule_advisors_count": 0,
        "upcoming_interactions_count": 0,
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

    defineFixture('GET', '/projects', { params: { team_id: '2' }, response: {
      "users": [],

      "projects": [{
        "id": 4,
        "status": "high",
        "name": "Team Project",
        "client_code": "EP",
        "details_url": "/projects/4",
        "created_at": "2009-07-14T17:05:32.909+01:00",
        "angle_ids": [],
        "analyst_1_id": 1,
        "proposed_advisors_count": 0,
        "left_to_schedule_advisors_count": 0,
        "upcoming_interactions_count": 0,
        "codename": "Chocolate 4"
      }],

      "angles": [],
      "angle_team_memberships": []
    }});

    defineFixture('GET', '/projects', { params: { whiteboard_id: '1' }, response: {
      "users": [],

      "projects": [{
        "id": 5,
        "status": "high",
        "name": "Whiteboard Project",
        "client_code": "EP",
        "details_url": "/projects/5",
        "created_at": "2009-07-14T17:05:32.909+01:00",
        "angle_ids": [],
        "analyst_1_id": 1,
        "proposed_advisors_count": 0,
        "left_to_schedule_advisors_count": 0,
        "upcoming_interactions_count": 0,
        "codename": "Chocolate 5"
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

    defineFixture('GET', '/users', { params: { whiteboard_id: '1' }, response: {
      "users": []
    }});

    defineFixture('GET', '/whiteboards', { response: {
      "whiteboards": []
    }});
  },

  afterEach: function() {
    testHelper.afterEach.apply(this, arguments);
  }
});

test("Read project list", function(assert) {
  visit('/whiteboards');

  andThen(function() {
    var projects = find('.whiteboard-project-list-item').toArray().map(function(project) {
      var $project = $(project);

      return {
        title: $project.find('.details .name').text().trim(),
        codename: $project.find('.details .codename').text().trim(),
        clientCode: $project.find('.details small').text().trim(),
        highPriority: $project.find('.priority-select .dropdown div.high').length === 1,
        mediumPriority: $project.find('.priority-select .dropdown div.medium').length === 1,
        lowPriority: $project.find('.priority-select .dropdown div.low').length === 1,
        memberAvatarUrl: $project.find('.members .avatar:not(.lead)').prop('src'),
        leadAvatarUrl: $project.find('.members .avatar.lead').prop('src'),
        deliveredCount: parseInt($project.find('.progress .delivered .count').text().trim(), 10),
        targetCount: parseInt($project.find('.progress .target .count').text().trim(), 10),
        progressBarWidth: $project.find('.progress .progress-bar > div').prop('style').width
      };
    });

    assert.deepEqual(projects, [{
      title: 'Example Project',
      codename: 'Chocolate 1',
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
      codename: 'Chocolate 2',
      clientCode: '2EP',
      highPriority: true,
      mediumPriority: false,
      lowPriority: false,
      memberAvatarUrl: undefined,
      leadAvatarUrl: Fixtures.EMPTY_IMAGE_URL,
      deliveredCount: 1,
      targetCount: 2,
      progressBarWidth: '50%'
    }]);
  });
});

test("Sort project list", function(assert) {
  var handler = defineFixture('PUT', '/projects/indexes', { request: {
    "projects": [
      { "id": "2", "index": 0 },
      { "id": "1", "index": 1 }
    ]
  }});

  visit('/whiteboards');
  dragAndDrop('.projects > ul > li:first .handle', '.projects > ul > li:last');

  andThen(function() {
    assert.deepEqual(
      projectTitles(),
      ['Example Project 2', 'Example Project']
    );
  });
});

test("Filter project list by medium priority", function(assert) {
  visit('/whiteboards');
  click('.projects > header .priority-select .medium');

  andThen(function() {
    assert.deepEqual(
      projectTitles(),
      ['Example Project 3']
    );
  });
});

test("Filter project list by low priority", function(assert) {
  visit('/whiteboards');
  click('.projects > header .priority-select .low');

  andThen(function() {
    assert.equal(find('.whiteboard .empty-message').text().trim(), 'There are no low priority projects.');
  });
});

test("Change project priority", function(assert) {
  var handler = defineFixture('PUT', '/projects/1', { request: {
    "project": {
      "client_code": "EP",
      "details_url": "/projects/1",
      "left_to_schedule_advisors_count": 0,
      "name": "Example Project",
      "proposed_advisors_count": 1,
      "status": "low",
      "index": null,
      "upcoming_interactions_count": 0,
      "analyst_1_id": "1",
      "codename": "Chocolate 1",
      "default_interaction_type": null
    }
  }});

  visit('/whiteboards');
  click('.whiteboard-project-list-item:first .priority-select .dropdown');
  click('.whiteboard-project-list-item:first .priority-select ul .low');

  andThen(function() {
    assert.equal(handler.called, true);
    assert.equal(find('.whiteboard-project-list-item .priority-select .dropdown > .high').length, 1);
  });
});

test("Show project details", function(assert) {
  visit('/whiteboards');
  click('.whiteboard-project-list-item:first');

  andThen(function(){
    var $project = find('.project');
    var $angle = $project.find('.angles article');

    var projectDetails = {
      title: $project.find('h1 span').text().trim(),
      highPriority: $project.find('.priority-select .dropdown > .high').length === 1,
      mediumPriority: $project.find('.priority-select .dropdown > .medium').length === 1,
      lowPriority: $project.find('.priority-select .dropdown > .low').length === 1,

      angle: {
        title: $angle.find('.title').text().trim(),

        memberships: $angle.find('.angle-memberships > ul article').toArray().map(function(membership) {
          var $membership = $(membership);

          return {
            avatarUrl: $membership.find('.avatar').prop('src'),
            deliveryTarget: $membership.find('.delivery-target input').val()
          };
        })
      }
    };

    assert.deepEqual(projectDetails, {
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

test("Navigate to next project with navigation buttons", function(assert) {
  visit('/whiteboards');
  click('.whiteboard-project-list-item:first');
  click('.project .next');

  andThen(function(){
    assert.equal(find('.project h1 span').text().trim(), 'Example Project 2');
  });
});

test("Navigate to next project with arrow keys", function(assert) {
  visit('/whiteboards');
  click('.whiteboard-project-list-item:first');
  keyEvent(document, 'keyup', 39);

  andThen(function(){
    assert.equal(find('.project h1 span').text().trim(), 'Example Project 2');
  });
});

test("Navigate to previous project with navigation buttons", function(assert) {
  visit('/whiteboards');
  click('.whiteboard-project-list-item:last');
  click('.project .previous');

  andThen(function(){
    assert.equal(find('.project h1 span').text().trim(), 'Example Project');
  });
});

test("Navigate to previous project with arrow keys", function(assert) {
  visit('/whiteboards');
  click('.whiteboard-project-list-item:last');
  keyEvent(document, 'keyup', 37);

  andThen(function(){
    assert.equal(find('.project h1 span').text().trim(), 'Example Project');
  });
});

test("Move back to the last project from the first", function(assert) {
  visit('/whiteboards');
  click('.whiteboard-project-list-item:first');
  click('.project .previous');

  andThen(function(){
    assert.equal(find('.project h1 span').text().trim(), 'Example Project 2');
  });
});

test("Move back to the first project from the last", function(assert) {
  visit('/whiteboards');
  click('.whiteboard-project-list-item:last');
  click('.project .next');

  andThen(function(){
    assert.equal(find('.project h1 span').text().trim(), 'Example Project');
  });
});

test("Change project priority from the details", function(assert) {
  var handler = defineFixture('PUT', '/projects/1', { request: {
    "project": {
      "client_code": "EP",
      "details_url": "/projects/1",
      "left_to_schedule_advisors_count": 0,
      "name": "Example Project",
      "proposed_advisors_count": 1,
      "status": "low",
      "index": null,
      "upcoming_interactions_count": 0,
      "analyst_1_id": "1",
      "codename": "Chocolate 1",
      "default_interaction_type": null
    }
  }});

  visit('/whiteboards');
  click('.whiteboard-project-list-item:first');
  click('.project .priority-select .dropdown');
  click('.project .priority-select ul .low');

  andThen(function() {
    assert.equal(handler.called, true);
    assert.equal(find('.whiteboard-project-list-item .priority-select .dropdown > .high').length, 1);
  });
});

test("Change delivery target for an angle membership", function(assert) {
  var handler = defineFixture('PUT', '/angle_team_memberships/1', { request: {
    "angle_team_membership": {
      "target_value": 6,
      "angle_id": "1",
      "team_member_id": "1"
    }
  }});

  visit('/whiteboards');
  click('.whiteboard-project-list-item:first');
  fillIn('.angle-memberships > ul article:first .delivery-target input', '6');

  andThen(function() {
    assert.equal(handler.called, true);
  });
});

test("Add a member to an angle", function(assert) {
  var handler = defineFixture('POST', '/angle_team_memberships', { request: {
    "angle_team_membership": {
      "target_value": 0,
      "angle_id": "1",
      "team_member_id": "3"
    }
  }});

  visit('/whiteboards');
  click('.whiteboard-project-list-item:first');
  click('.angle-memberships .add button');
  click('.angle-memberships .add .members li');

  andThen(function() {
    assert.equal(handler.called, true);
    assert.equal(find('.angle-memberships > ul article').length, 3);
  });
});

test("Remove a member from an angle", function(assert) {
  var handler = defineFixture('DELETE', '/angle_team_memberships/1');

  visit('/whiteboards');
  click('.whiteboard-project-list-item:first');
  click('.angle-memberships > ul article:first .remove');

  andThen(function() {
    assert.equal(handler.called, true);
    assert.equal(find('.angle-memberships > ul article').length, 1);
  });
});

test("Change selected team", function(assert) {
  visit('/whiteboards');

  click('.whiteboard-select button');
  select('.whiteboard-select select ', 'Example Team 2');

  andThen(function() {
    assert.equal(find('.whiteboard-project-list-item .details .name').text().trim(), 'Team Project');
  });
});

test("Change selected whiteboard", function(assert) {
  defineFixture('GET', '/whiteboards', { response: {
    "whiteboards": [
      {
        "id": 1,
        "name": "Cool whiteboard"
      }
    ]
  }});

  visit('/whiteboards');

  click('.whiteboard-select button');
  select('.whiteboard-select select ', 'Cool whiteboard');

  andThen(function() {
    assert.equal(find('.whiteboard-project-list-item .details .name').text().trim(), 'Whiteboard Project');
  });
});
