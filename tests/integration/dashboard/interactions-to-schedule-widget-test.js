import Ember from 'ember';
import { test } from 'ember-qunit';
import '../../helpers/define-fixture';
import testHelper from '../../test-helper';

const interactionToSchedule = {
  advisorName: 'Johnny Advisor',
  projectName: 'Project Name',
  requestedAt: '2015-02-18T10:00:00.000+00:00',
  checklistItemCompletionStatus: true
};

QUnit.module("Interactions To Schedule Widget", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    Timecop.install();
    Timecop.freeze(moment('2015-02-18T10:30:00.000+00:00'));

    defineFixture('GET', '/interactions', { params: { primary_contact_id: "1" }, response: {
      "advisors": [
        {
          "id": 1,
          "avatar_url": null,
          "emails": ['advisor@email.com'],
          "name": interactionToSchedule.advisorName,
          "phone_numbers": ['+1 555-123-4567'],
          "job_title": 'Vice President',
          "company_name": 'Apple'
        }
      ],
      "client_contacts": [
        {
          "id": 21387,
          "avatar_url": null,
          "emails": ['client@email.com'],
          "name": 'Bob Client',
          "phone_numbers": ['+1 555-321-9000'],
          "client_account_id": 485
        }
      ],
      "client_accounts": [
        {
           "id": 485,
           "name": 'McKinsey & Company San Francisco'
        }
      ],
      "projects": [
        {
           "id": 32522,
           "status": "high",
           "name": interactionToSchedule.projectName,
           "client_code": "MCKU",
           "details_url": "/projects/32522",
           "index": 3,
           "created_at": "2015-01-23T21:01:33.615+00:00",
           "angle_ids": [40380],
           "analyst_1_id": 6565389
        }
      ],
      "interactions": [
        {
          "id": 1,
          "scheduled_call_time": null,
          "advisor_id": 1,
          "client_contact_id": 21387,
          "project_id": 32522,
          "checklist_item_ids": [1],
          "requested_at": interactionToSchedule.requestedAt,
          "actioned": false
        },
        {
          "id": 2,
          "scheduled_call_time": null,
          "advisor_id": 1,
          "client_contact_id": 21387,
          "project_id": 32522,
          "checklist_item_ids": [1],
          "requested_at": interactionToSchedule.requestedAt,
          "actioned": false
        },
        {
          "id": 3,
          "scheduled_call_time": null,
          "advisor_id": 1,
          "client_contact_id": 21387,
          "project_id": 32522,
          "checklist_item_ids": [1],
          "requested_at": interactionToSchedule.requestedAt,
          "actioned": false
        },
        {
          "id": 4,
          "scheduled_call_time": null,
          "advisor_id": 1,
          "client_contact_id": 21387,
          "project_id": 32522,
          "checklist_item_ids": [1],
          "requested_at": interactionToSchedule.requestedAt,
          "actioned": false
        },
        {
          "id": 5,
          "scheduled_call_time": null,
          "advisor_id": 1,
          "client_contact_id": 21387,
          "project_id": 32522,
          "checklist_item_ids": [1],
          "requested_at": interactionToSchedule.requestedAt,
          "actioned": false
        },
        {
          "id": 6,
          "scheduled_call_time": null,
          "advisor_id": 1,
          "client_contact_id": 21387,
          "project_id": 32522,
          "checklist_item_ids": [1],
          "requested_at": interactionToSchedule.requestedAt,
          "actioned": true
        }
      ],
      "checklist_items": [
        {
          "id": 1,
          "completed": interactionToSchedule.checklistItemCompletionStatus,
          "type": "terms_of_engagement"
        }
      ]
    }});
  },

  afterEach: function() {
    testHelper.afterEach.apply(this, arguments);
    Timecop.uninstall();
  }
});


test("Show interactions to schedule list", function(assert) {
  visit('/dashboard');

  andThen(function() {
    var $interaction = find('.interactions-to-schedule article:first');

    var interactionListItem = {
      advisorName: $interaction.find('.title span').text().trim(),
      projectName: $interaction.find('.title small').text().trim(),
      isChecklistComplete: $interaction.find('.checklist-status.complete').length === 1,
      relativeRequestedAtTime: $interaction.find('.time span').text().trim()
    };

    assert.deepEqual(interactionListItem, {
      advisorName: interactionToSchedule.advisorName,
      projectName: interactionToSchedule.projectName,
      isChecklistComplete: true,
      relativeRequestedAtTime: 'Requested 30 minutes ago'
    });

    assert.equal(find('.interactions-to-schedule article').length, 4);
  });
});

test("Expand interactions to schedule list", function(assert) {
  visit('/dashboard');
  click('.interactions-to-schedule .toggle-collapse');

  andThen(function() {
    assert.equal(find('.interactions-to-schedule article').length, 5);
  });
});

test("Collapse interactions to schedule list", function(assert) {
  visit('/dashboard');
  click('.interactions-to-schedule .toggle-collapse');
  click('.interactions-to-schedule .toggle-collapse');

  andThen(function() {
    assert.equal(find('.interactions-to-schedule article').length, 4);
  });
});

test("Filter interactions to schedule by Team Member", function(assert) {
  const team = {
    id: 1
  };

  const andrewRath = {
    id: 1,
    name: "Andrew Rath",
    initials: "ARR"
  };

  const andrewRathInteraction = {
    advisorId: 1,
    advisorName: "Rath's Friend"
  };

  const taylorBrown = {
    id: 2,
    name: "Taylor Brown",
    initials: "TBB"
  };

  const taylorBrownInteraction = {
    advisorId: 2,
    advisorName: "Taylor's Pal"
  };

  defineFixture('GET', '/users/me', { response: {
    "user": {
      "id": andrewRath.id,
      "name": andrewRath.name,
      "time_zone": "America/New_York",
      "initials": andrewRath.initials,
      "team_id": team.id
    }
  }});

  defineFixture('GET', '/teams', { response: {
    "teams": [
      {
        "name": "NYSC13 - McKin' It Rain ",
        "id": team.id,
        "office": "New York"
      }
    ]
  }});

  defineFixture('GET', '/users', { params: { team_id: team.id.toString()}, response: {
    "users": [
      {
        "id": andrewRath.id,
        "avatar_url": "https://s3.amazonaws.com/assets_development.alphasights.com/avatars/6565139/thumb.jpeg?1381437797",
        "name": "Andrew Rath",
        "time_zone": "America/New_York",
        "initials": andrewRath.initials,
        "team_id": team.id,
        "developer": false
      },
      {
        "id": taylorBrown.id,
        "avatar_url": "https://s3.amazonaws.com/assets_development.alphasights.com/avatars/6565296/thumb.jpg?1390906879",
        "name": taylorBrown.name,
        "time_zone": "America/New_York",
        "initials": taylorBrown.initials,
        "team_id": team.id,
        "developer":false
      }
    ]
  }});

  defineFixture('GET', '/interactions', { params: { team_id: team.id.toString()}, response: {
    "advisors": [
      {
        "id": andrewRathInteraction.advisorId,
        "avatar_url": null,
        "emails": ['advisor@email.com'],
        "name": andrewRathInteraction.advisorName,
        "phone_numbers": ['+1 555-123-4567'],
        "job_title": 'Vice President',
        "company_name": 'Apple'
      },
      {
        "id": taylorBrownInteraction.advisorId,
        "avatar_url": null,
        "emails": ['advisor@email.com'],
        "name": taylorBrownInteraction.advisorName,
        "phone_numbers": ['+1 555-123-4567'],
        "job_title": 'Vice President',
        "company_name": 'Apple'
      }
    ],
    "client_contacts": [
      {
        "id": 21387,
        "avatar_url": null,
        "emails": ['client@email.com'],
        "name": 'Bob Client',
        "phone_numbers": ['+1 555-321-9000'],
        "client_account_id": 485
      }
    ],
    "client_accounts": [
      {
         "id": 485,
         "name": 'McKinsey & Company San Francisco'
      }
    ],
    "projects": [
      {
         "id": 32522,
         "status": "high",
         "name": 'Project Name',
         "client_code": "MCKU",
         "details_url": "/projects/32522",
         "index": 3,
         "created_at": "2015-01-23T21:01:33.615+00:00",
         "angle_ids": [40380],
         "analyst_1_id": andrewRath.id
      }
    ],
    "interactions": [
      {
        "id": 1,
        "scheduled_call_time": null,
        "advisor_id": andrewRathInteraction.advisorId,
        "client_contact_id": 21387,
        "project_id": 32522,
        "checklist_item_ids": [],
        "requested_at": interactionToSchedule.requestedAt,
        "primary_contact_id": andrewRath.id,
        "actioned": false
      },
      {
        "id": 2,
        "scheduled_call_time": null,
        "advisor_id": taylorBrownInteraction.advisorId,
        "client_contact_id": 21387,
        "project_id": 32522,
        "checklist_item_ids": [],
        "requested_at": interactionToSchedule.requestedAt,
        "primary_contact_id": taylorBrown.id,
        "actioned": false
      }
    ],
    "checklist_items": []
  }});

  defineFixture('GET', '/delivery_performances', { params: { team_id: team.id.toString()}, response: {
    "delivery_performances": []
  }});

  visit(`/dashboard?team_id=${team.id}`);

  andThen(function() {
    var interactions = find('.interactions-to-schedule article').toArray().map(function(interaction) {
      var $interaction = $(interaction);

      return {
        advisorName: $interaction.find('.title span').text().trim()
      };
    });

    assert.deepEqual(interactions, [{
      advisorName: andrewRathInteraction.advisorName
    }, {
      advisorName: taylorBrownInteraction.advisorName
    }]);
  });

  // Click Filter, Switch to Taylor
  click('.interactions-to-schedule .filters .team-members button');
  click(`.interactions-to-schedule a:contains(${taylorBrown.name})`);

  // Check that only Taylor Brown interactions are in the DOM
  andThen(function() {
    var interactions = find('.interactions-to-schedule article').toArray().map(function(interaction) {
      var $interaction = $(interaction);

      return {
        advisorName: $interaction.find('.title span').text().trim()
      };
    });

    assert.deepEqual(interactions, [{
      advisorName: taylorBrownInteraction.advisorName
    }]);
  });
});
