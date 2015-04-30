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

    defineFixture('GET', '/interactions', { params: { team_id: '' }, response: {
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

    defineFixture('GET', '/users/me', { response: {
      "user": {
        "id": 6565427,
        "avatar_url": "",
        "name": "Sarah Saltz",
        "time_zone": "America/New_York",
        "initials": "SSa",
        "team_id": 136,
        "developer": false
      }
    }});

    defineFixture('GET', '/teams', { response: {
      "teams": [
        {
          "name" : "NYSC18 - The McKountry Klub",
          "id": 136,
          "office": "New York"
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
