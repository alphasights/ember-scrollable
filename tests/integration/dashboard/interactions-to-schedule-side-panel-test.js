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

QUnit.module("Interactions To Schedule Side Panel", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    Timecop.install();
    Timecop.freeze(moment('2015-02-18T10:30:00.000+00:00'));

    defineFixture('GET', '/interactions', { response: {
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
          "checklist_item_ids": [],
          "requested_at": interactionToSchedule.requestedAt,
          "actioned": false
        }
      ],
      "checklist_items": []
    }});

    defineFixture('GET', '/users', { params: { team_id: '1' }, response: {
      "users": []
    }});

    defineFixture('GET', '/delivery_performances/me', { response: {
      "delivery_performance":{
        "id": 1,
        "user_id": 1,
        "current_month_credit_count": 0,
        "monthly_target": 0
      }
    }});
  },

  afterEach: function() {
    testHelper.afterEach.apply(this, arguments);
    Timecop.uninstall();
  }
});


test("Cancel interaction returns to dashboard and removes interaction from the widget", function(assert) {
  defineFixture('DELETE', '/interests/1', { response: {
    "interactions": [
      {
        "id": 1,
        "scheduled_call_time": null,
        "actioned": null,
        "requested_at": null,
        "checklist_item_ids": [],
        "interaction_type": 'One-on-one Call',
        "advisor_time_zone": "PST",
        "advisor_phone_country_code": "+1",
        "advisor_phone_number": "7654321",
        "client_time_zone": "EST",
        "dial_in_number": "1234567",
        "primary_contact_id": 1,
        "speak": true,
        "client_access_number_country": "US",
      }
    ]
  }});

  visit('/dashboard');

  andThen(function() {
    assert.equal(find('.interactions-to-schedule article').length, 1,
    'shows the interaction to schedule in the widget');
  });

  click('.interactions-to-schedule article:first');
  click('.form-submission a');
  click('button.confirm-cancel');

  andThen(function() {
    assert.equal(currentURL(), '/dashboard',
      'returns the user to dashboard after cancelling'
    );

    assert.equal(find('.interactions-to-schedule article').length, 0,
      'removes the interaction from the widget'
    );
  });
});
