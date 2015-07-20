import Ember from 'ember';
import { test } from 'ember-qunit';
import '../../helpers/define-fixture';
import testHelper from '../../test-helper';

const interaction = {
  id: 1,
  actioned: false,
  clientAccessNumberCountry: 'US',
  additionalContactDetails: '',
  requestedAt: '2015-02-18T10:00:00.000Z',
  scheduledCallTime: '2015-02-19T10:00:00.000Z',
  speak: true,
  interactionType: 'call',
  advisorPhoneCountryCode: '54',
  advisorPhoneNumber: '91151016387',
  speakPhoneNumber: '+1 212-231-2222',
  speakCode: '777502',
  advisorId: '11',
  clientContactId: '299',
  projectId: '14',
  used: false,
  paymentRequired: true,
  hasAdvisorInvoice: false
};

QUnit.module("Scheduled Interactions Side Panel", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    defineFixture('GET', '/interactions', { params: { primary_contact_id: '1' }, response: {
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
           "created_at": "2015-01-23T21:01:33.615Z",
           "angle_ids": [40380],
           "analyst_1_id": 6565389
        }
      ],
      "interactions": [
        {
          "id": interaction.id,
          "scheduled_call_time": interaction.scheduledCallTime,
          "advisor_id": interaction.advisorId,
          "client_contact_id": interaction.clientContactId,
          "project_id": interaction.projectId,
          "checklist_item_ids": [],
          "requested_at": interaction.requestedAt,
          "client_access_number_country": interaction.clientAccessNumberCountry,
          "actioned": interaction.actioned,
          "additional_contact_details": interaction.additionalContactDetails,
          "speak": interaction.speak,
          "interaction_type": interaction.interactionType,
          "advisor_phone_country_code": interaction.advisorPhoneCountryCode,
          "advisor_phone_number": interaction.advisorPhoneNumber,
          "speak_phone_number": interaction.speakPhoneNumber,
          "speak_code": interaction.speakCode,
          "payment_required": interaction.paymentRequired,
          "has_advisor_invoice": interaction.hasAdvisorInvoice
        }
      ],
      "checklist_items": []
    }});
  },

  afterEach: function() {
    testHelper.afterEach.apply(this, arguments);
  }
});

test("Cancel request returns to dashboard and removes interaction from the widget", function(assert) {
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
        "client_access_number_country": "US",
        "payment_required": true
      }
    ]
  }});

  visit('/dashboard');
  click('.scheduled-interactions article:first');
  click("button.cancel:contains('Cancel Request')");
  click("button:contains('Yes, Cancel Request')");

  andThen(function() {
    assert.equal(currentURL(), '/dashboard',
      'returns the user to dashboard after cancelling'
    );

    assert.equal(find('.scheduled-interactions article').length, 0,
      'removes the interaction from the widget'
    );

    var message = $('.messenger .messenger-message-inner').first().text().trim();
    assert.equal(message, "The request has been cancelled.");
  });
});

test("Cancel and withdraw request returns to dashboard and removes interaction from the widget", function(assert) {
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
  click('.scheduled-interactions article:first');
  click("button:contains('Cancel and Withdraw Request')");
  click("button:contains('Yes, Cancel and Withdraw Request')");

  andThen(function() {
    assert.equal(currentURL(), '/dashboard',
      'returns the user to dashboard after cancelling'
    );

    assert.equal(find('.scheduled-interactions article').length, 0,
      'removes the interaction from the widget'
    );

    var message = $('.messenger .messenger-message-inner').first().text().trim();
    assert.equal(message, "The request has been cancelled.");
  });
});

test("Cancel Request Failure", function(assert) {
  defineFixture('DELETE', '/interests/1', {
    params: { withdraw_from_compliance: 'false' },
    status: 500
  });

  visit('/dashboard');

  andThen(function() {
    assert.equal(find('.scheduled-interactions article').length, 1,
    'shows the original scheduled interaction in the widget');
  });

  click('.scheduled-interactions article:first');
  click("button:contains('Cancel Request')");
  click("button:contains('Yes, Cancel Request')");

  andThen(function() {
    assert.equal(find('.scheduled-interactions article').length, 1,
      'does not remove the interaction from the widget'
    );

    var message = $('.messenger .messenger-message-inner').first().text().trim();
    assert.equal(message, "The request could not be cancelled.",
      'displays a message that it could not be cancelled'
    );
  });
});

test("Cancel Interaction unschedules the call and transitions to the to schedule side panel", function(assert) {
  defineFixture('GET', '/unavailabilities', { params: { interaction_id: '1' }, response: {
    "unavailabilities": []
  }});

  var handler = defineFixture('PUT', `/interactions/${interaction.id}`, { request: {
    "interaction": {
      "actioned": interaction.actioned,
      "client_access_number_country": interaction.clientAccessNumberCountry,
      "payment_required": interaction.paymentRequired,
      "additional_contact_details": interaction.additionalContactDetails,
      "requested_at": interaction.requestedAt,
      "scheduled_call_time": null,
      "speak": interaction.speak,
      "interaction_type": interaction.interactionType,
      "advisor_phone_country_code": interaction.advisorPhoneCountryCode,
      "advisor_phone_number": interaction.advisorPhoneNumber,
      "speak_phone_number": interaction.speakPhoneNumber,
      "speak_code": interaction.speakCode,
      "used": interaction.used,
      "advisor_id": interaction.advisorId,
      "client_contact_id": interaction.clientContactId,
      "project_id": interaction.projectId,
      "has_advisor_invoice": interaction.hasAdvisorInvoice
    }
  }});

  visit('/dashboard');

  andThen(function() {
    assert.equal(find('.scheduled-interactions article').length, 1,
    'shows the original scheduled interaction in the widget');

    assert.equal(find('.interactions-to-schedule article').length, 0,
    'does not shows the scheduled interaction in the interactions to schedule widget');
  });

  click('.scheduled-interactions article:first');
  click("button:contains('Cancel Interaction')");

  andThen(function() {
    assert.equal(find('.scheduled-interactions article').length, 0,
      'remove the interaction from the scheduled interaction widget'
    );

    assert.equal(currentURL(), `/dashboard/interactions/${interaction.id}/schedule`,
      'transitions to the scheduling side panel'
    );

    var message = $('.messenger .messenger-message-inner').first().text().trim();
    assert.equal(message, "The interaction has been cancelled.");
  });
});

test("Cancel Interaction failure shows error message and stays on the interaction side panel", function(assert) {
  defineFixture('GET', '/unavailabilities', { params: { interaction_id: '1' }, response: {
    "unavailabilities": []
  }});

  var handler = defineFixture('PUT', `/interactions/${interaction.id}`, {
    status: 500,
    request: {
      "interaction": {
        "actioned": interaction.actioned,
        "client_access_number_country": interaction.clientAccessNumberCountry,
        "additional_contact_details": interaction.additionalContactDetails,
        "requested_at": interaction.requestedAt,
        "scheduled_call_time": null,
        "speak": interaction.speak,
        "interaction_type": interaction.interactionType,
        "advisor_phone_country_code": interaction.advisorPhoneCountryCode,
        "advisor_phone_number": interaction.advisorPhoneNumber,
        "speak_phone_number": interaction.speakPhoneNumber,
        "speak_code": interaction.speakCode,
        "advisor_id": interaction.advisorId,
        "client_contact_id": interaction.clientContactId,
        "project_id": interaction.projectId,
        "used": interaction.used
      }
    }
  });

  visit('/dashboard');
  click('.scheduled-interactions article:first');
  click("button:contains('Cancel Interaction')");

  andThen(function() {
    const message = 'There has been an error rescheduling the interaction.';
    assert.equal(message, $('.messenger .messenger-message-inner').first().text().trim());

    assert.equal(currentURL(), `/dashboard/interactions/${interaction.id}`,
      'transitions back to the interaction side panel'
    );

    assert.equal($('.date .month').text().trim(), 'February');
    assert.equal($('.date .day').text().trim(), '19');
  });
});

const interactionCompletion = {
  duration: 20,
  customCredits: null,
  customRevenue: null,
  quality: 'bad',
  interactionType: 'call',
  interactionId: '1',
  speakQuality: 'other',
  speakExplanation: 'Client was grumpy.'
};

test("Complete Interaction and Charge Client completes the call", function(assert) {
  const successMessage = 'The interaction has been completed.';

  var handler = defineFixture('POST', '/interaction_completions', {
    request: {
      "interaction_completion": {
        "duration": interactionCompletion.duration,
        "custom_credits": interactionCompletion.customCredits,
        "custom_revenue": interactionCompletion.customRevenue,
        "quality": interactionCompletion.quality,
        "interaction_type": interactionCompletion.interactionType,
        "interaction_id": interactionCompletion.interactionId,
        "speak_quality": interactionCompletion.speakQuality,
        "speak_explanation": interactionCompletion.speakExplanation,
        "voided_at": null
      }
    },

    response: {
      "interactions": [{
        "id": interaction.id,
        "actioned": interaction.actioned,
        "client_access_number_country": interaction.clientAccessNumberCountry,
        "additional_contact_details": interaction.additionalContactDetails,
        "requested_at": interaction.requestedAt,
        "scheduled_call_time": null,
        "speak": interaction.speak,
        "interaction_type": interaction.interactionType,
        "advisor_phone_country_code": interaction.advisorPhoneCountryCode,
        "advisor_phone_number": interaction.advisorPhoneNumber,
        "speak_phone_number": interaction.speakPhoneNumber,
        "speak_code": interaction.speakCode,
        "advisor_id": interaction.advisorId,
        "client_contact_id": interaction.clientContactId,
        "project_id": interaction.projectId,
        "used": true
      }]
    }
  });

  visit('/dashboard');

  click('.scheduled-interactions article:first');
  click('button:contains("Complete")');
  fillIn('input[name=duration]', '20');
  select('select[name=quality]', 'Bad');
  select('select[name=speakQuality]', 'Other issue');
  fillIn('input[name=speakExplanation]', interactionCompletion.speakExplanation);
  click('button:contains("Charge Client")');

  andThen(function() {
    assert.equal(handler.called, true);
    assert.equal($('.messenger-message-inner:first').text().trim(), successMessage);
  });
});

test("Complete Interaction and Don't Pay Advisor/Change updates the interaction", function(assert) {
  let dontPayAdvisorRequest = defineFixture('PUT', `/interactions/${interaction.id}`, { request: {
    "interaction": {
      "actioned": interaction.actioned,
      "client_access_number_country": interaction.clientAccessNumberCountry,
      "additional_contact_details": interaction.additionalContactDetails,
      "payment_required": false,
      "requested_at": interaction.requestedAt,
      "scheduled_call_time": interaction.scheduledCallTime,
      "speak": interaction.speak,
      "interaction_type": interaction.interactionType,
      "advisor_phone_country_code": interaction.advisorPhoneCountryCode,
      "advisor_phone_number": interaction.advisorPhoneNumber,
      "speak_phone_number": interaction.speakPhoneNumber,
      "speak_code": interaction.speakCode,
      "used": interaction.used,
      "advisor_id": interaction.advisorId,
      "client_contact_id": interaction.clientContactId,
      "project_id": interaction.projectId
    }
  }});


  visit('/dashboard');

  click('.scheduled-interactions article:first');
  click('button:contains("Complete")');

  let buttonText = "Don't Pay";
  click(`button:contains(${buttonText})`);

  andThen(function() {
    const message = 'The advisor will not be paid.';
    assert.equal(
      message, $('.advisor-payment .actions span').first().text().trim(),
      "it updates the content to say the advisor will not be paid"
    );
  });

  let changeAdvisorPaymentRequest = defineFixture('PUT', `/interactions/${interaction.id}`, { request: {
    "interaction": {
      "actioned": interaction.actioned,
      "client_access_number_country": interaction.clientAccessNumberCountry,
      "additional_contact_details": interaction.additionalContactDetails,
      "payment_required": true,
      "requested_at": interaction.requestedAt,
      "scheduled_call_time": interaction.scheduledCallTime,
      "speak": interaction.speak,
      "interaction_type": interaction.interactionType,
      "advisor_phone_country_code": interaction.advisorPhoneCountryCode,
      "advisor_phone_number": interaction.advisorPhoneNumber,
      "speak_phone_number": interaction.speakPhoneNumber,
      "speak_code": interaction.speakCode,
      "used": interaction.used,
      "advisor_id": interaction.advisorId,
      "client_contact_id": interaction.clientContactId,
      "project_id": interaction.projectId
    }
  }});

  click("button:contains('Change')");

  andThen(function() {
    assert.equal(
      $(`button:contains(${buttonText})`).length, 1,
      "it displays the Don't Pay button again after clicking 'Change'"
    );
  });
});
