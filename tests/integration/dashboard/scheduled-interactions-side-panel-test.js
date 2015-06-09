import Ember from 'ember';
import { test } from 'ember-qunit';
import '../../helpers/define-fixture';
import testHelper from '../../test-helper';

const interaction = {
  id: 1,
  actioned: false,
  clientAccessNumberCountry: 'US',
  additionalContactDetails: '',
  requested_at: '2015-02-18T10:00:00.000+00:00',
  scheduled_call_time: '2015-02-19T10:00:00.000+00:00',
  speak: true,
  interaction_type: 'call',
  advisorPhoneCountryCode: '54',
  advisorPhoneNumber: '91151016387',
  speakPhoneNumber: '+1 212-231-2222',
  speakCode: '777502',
  advisorId: 11,
  clientContactId: 299,
  projectId: 14,
  used: false
};

QUnit.module("Scheduled Interactions Side Panel", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    defineFixture('GET', '/interactions', { params: { primary_contact_id: "1" }, response: {
      "advisors": [
        {
          "id": interaction.advisorId,
          "avatar_url": null,
          "emails": ['advisor@email.com'],
          "name": 'Johnny Advisor',
          "phone_numbers": ['+1 555-123-4567'],
          "phones": [
            {
              "number": '+1 555-123-4567',
              "type": 'mobile',
              "primary": true
            }
          ],
          "job_title": 'Vice President',
          "company_name": 'Apple'
        }
      ],
      "client_contacts": [
        {
          "id": interaction.clientContactId,
          "avatar_url": null,
          "emails": ['client@email.com'],
          "name": 'Bob Client',
          "phone_numbers": ['+1 555-321-9000'],
          "phones": [
            {
              "number": '+1 555-321-9000',
              "type": 'mobile',
              "primary": true
            }
          ],
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
           "id": interaction.projectId,
           "status": "high",
           "name": 'Project Name',
           "client_code": "MCKU",
           "details_url": `/projects/${interaction.projectId}`,
           "index": 3,
           "created_at": "2015-01-23T21:01:33.615+00:00",
           "angle_ids": [40380],
           "analyst_1_id": 6565389
        }
      ],
      "interactions": [
        {
          "id": interaction.id,
          "scheduled_call_time": interaction.scheduled_call_time,
          "advisor_id": interaction.advisorId,
          "client_contact_id": interaction.clientContactId,
          "project_id": interaction.projectId,
          "checklist_item_ids": [],
          "requested_at": interaction.requested_at,
          "client_access_number_country": interaction.clientAccessNumberCountry,
          "actioned": interaction.actioned,
          "additional_contact_details": interaction.additionalContactDetails,
          "speak": interaction.speak,
          "interaction_type": 'call',
          "advisor_phone_country_code": interaction.advisorPhoneCountryCode,
          "advisor_phone_number": interaction.advisorPhoneNumber,
          "speak_phone_number": interaction.speakPhoneNumber,
          "speak_code": interaction.speakCode,
          "used": false
        }
      ],
      "checklist_items": []
    }});
  },

  afterEach: function() {
    testHelper.afterEach.apply(this, arguments);
  }
});

test("Cancel interaction returns to dashboard and removes interaction from the widget", function(assert) {
  defineFixture('DELETE', '/interests/1', { params: { "withdraw_from_compliance": "false" }, response: {
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
        "client_access_number_country": interaction.clientAccessNumberCountry
      }
    ]
  }});

  visit('/dashboard');

  andThen(function() {
    assert.equal(find('.scheduled-interactions article').length, 1,
    'shows the upcoming interaction in the widget');
  });

  click('.scheduled-interactions article:first');
  click("button:contains('Cancel Interaction')");

  andThen(function() {
    assert.equal(currentURL(), '/dashboard',
      'returns the user to dashboard after cancelling'
    );

    assert.equal(find('.scheduled-interactions article').length, 0,
      'removes the interaction from the widget'
    );

    var message = $('.messenger .messenger-message-inner').first().text().trim();
    assert.equal(message, "The interaction has been cancelled.");
  });
});

test("Cancel and withdraw interaction returns to dashboard and removes interaction from the widget", function(assert) {
  defineFixture('DELETE', '/interests/1', { params: { "withdraw_from_compliance": "true" }, response: {
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
    assert.equal(find('.scheduled-interactions article').length, 1,
    'shows the upcoming interaction in the widget');
  });

  click('.scheduled-interactions article:first');
  click("button:contains('Cancel and Withdraw Interaction')");
  click("button:contains('Yes, Cancel and Withdraw')");

  andThen(function() {
    assert.equal(currentURL(), '/dashboard',
      'returns the user to dashboard after cancelling'
    );

    assert.equal(find('.scheduled-interactions article').length, 0,
      'removes the interaction from the widget'
    );

    var message = $('.messenger .messenger-message-inner').first().text().trim();
    assert.equal(message, "The interaction has been cancelled.");
  });
});

test("Cancel Interaction Failure", function(assert) {
  defineFixture('DELETE', '/interests/1', { status: 500 });

  visit('/dashboard');

  andThen(function() {
    assert.equal(find('.scheduled-interactions article').length, 1,
    'shows the original scheduled interaction in the widget');
  });

  click('.scheduled-interactions article:first');
  click("button:contains('Cancel Interaction')");
  click("button:contains('Yes, Cancel Interaction')");

  andThen(function() {
    assert.equal(find('.scheduled-interactions article').length, 1,
      'does not remove the interaction from the widget'
    );

    var message = $('.messenger .messenger-message-inner').first().text().trim();
    assert.equal(message, "The interaction could not be cancelled.",
      'displays a message that it could not be cancelled'
    );
  });
});

test("Reschedule Interaction unschedules the call and transitions to the to schedule side panel", function(assert) {
  var handler = defineFixture('PUT', `/interactions/${interaction.id}`, { request: {
    "interaction": {
      "actioned": interaction.actioned,
      "client_access_number_country": interaction.clientAccessNumberCountry,
      "additional_contact_details": interaction.additionalContactDetails,
      "requested_at": interaction.requested_at,
      "scheduled_call_time": null,
      "speak": interaction.speak,
      "interaction_type": interaction.interaction_type,
      "advisor_phone_country_code": interaction.advisorPhoneCountryCode,
      "advisor_phone_number": interaction.advisorPhoneNumber,
      "speak_phone_number": interaction.speakPhoneNumber,
      "speak_code": interaction.speakCode,
      "advisor_id": interaction.advisorId,
      "client_contact_id": interaction.clientContactId,
      "project_id": interaction.projectId,
      "used": interaction.used
    }
  }});

  visit('/dashboard');

  andThen(function() {
    assert.equal(find('.scheduled-interactions article').length, 1,
    'shows the original scheduled interaction in the widget');

    assert.equal(find('.upcoming-interactions article').length, 0,
    'does not shows the scheduled interaction in the upcoming widget');
  });

  click('.scheduled-interactions article:first');
  click("button:contains('Reschedule Interaction')");

  andThen(function() {
    assert.equal(find('.scheduled-interactions article').length, 0,
      'remove the interaction from the scheduled interaction widget'
    );

    assert.equal(find('.upcoming-interactions article').length, 1,
      'adds the interaction to the interactions to schedule widget'
    );

    assert.equal(currentPath, `/dashboard/interactions/${interaction.id}/schedule`,
      'transitions to the scheduling side panel'
    );
  });
});

test("Complete Interaction completes the call and closes the side panel", function(assert) {
  const interactionCompletion = {
    duration: 20,
    quality: 'bad',
    interactionType: 'call'
  };

  const successMessage = 'The interaction has been completed.';

  var handler = defineFixture('POST', `/interaction_completions/${interaction.id}`, {
    request: {
      "interaction_completion": {
        "duration": interactionCompletion.duration,
        "quality": interactionCompletion.quality,
        "interaction_type": interactionCompletion.interactionType
      }
    },

    response: {
      "interactions": [{
      }]
    }
  });

  visit('/dashboard');

  click('.scheduled-interactions article:first');
  click('button:contains("Complete Interaction")');
  fillIn('input[name=duration]', '20');
  select('select[name=quality] option[value=bad]');
  click('button:contains("Charge Client")');

  andThen(function() {
    assert.equal(handler.called, true);
    assert.equal($('.messenger-message-inner:first').text().trim(), successMessage);
    assert.equal(find('.scheduled-interactions article').length, 0);
    assert.equal(currentPath, '/dashboard');
  });
});
