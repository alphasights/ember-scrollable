import Ember from 'ember';
import { test } from 'ember-qunit';
import '../../helpers/define-fixture';
import '../../helpers/select-time';
import testHelper from '../../test-helper';

const interaction = {
  id: 1
};

QUnit.module("Interactions To Schedule Side Panel", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    defineFixture('GET', '/interactions', { params: { primary_contact_id: '1' }, response: {
      "advisors": [
        {
          "id": 1,
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
          "id": 21387,
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
           "id": 32522,
           "status": "high",
           "name": 'Project Name',
           "client_code": "MCKU",
           "details_url": "/projects/32522",
           "index": 3,
           "created_at": "2015-01-23T21:01:33.615+00:00",
           "angle_ids": [40380],
           "analyst_1_id": 6565389,
           "default_interaction_type": "summarised_call"
        }
      ],
      "interactions": [
        {
          "id": interaction.id,
          "scheduled_call_time": null,
          "advisor_id": 1,
          "client_contact_id": 21387,
          "project_id": 32522,
          "checklist_item_ids": [],
          "requested_at": '2015-02-18T10:00:00.000+00:00',
          "actioned": false,
          "payment_required": true
        }
      ],
      "checklist_items": []
    }});

    defineFixture('GET', '/unavailabilities', { params: { interaction_id: '1' }, response: {
      "unavailabilities": [
        {
          "id": 123,
          "starts_at": moment().utc().startOf('isoWeek').add(9, 'hours').toISOString(),
          "ends_at": moment().utc().startOf('isoWeek').add(10, 'hours').toISOString(),
          "day": null,
          "interaction_id": 2,
          "type": 'alpha_call',
          "title": 'AlphaCall'
        }
      ]
    }});

    defineFixture('GET', '/interaction_types', { response: {
      "interaction_types": {
        "call": "One-on-one Call",
        "hosted_call": 'Hosted Call',
        "summarised_call": 'Interaction Summary'
      },
      "classifications": {
        "hosted": [
          "hosted_call",
          "summarised_call"
        ],
        "duration_based": [
          "call"
        ]
      }
    }});

    defineFixture('GET', '/dial_ins', { response: {
      "dial_ins":{
        "AU":"Australia",
        "AT":"Austria",
        "BE":"Belgium"
      }
    }});
  },

  afterEach: function() {
    testHelper.afterEach.apply(this, arguments);
  }
});

test("Display other Alpha Calls in calendar", function(assert) {
  visit('/dashboard');
  click('.interactions-to-schedule article:first');

  andThen(function() {
    var nineAmCallSlot = find('.as-calendar-occurrence:first');
    assert.equal(nineAmCallSlot.text().trim(), 'AlphaCall');
  });
});

test("Schedule interaction makes an API request and displays a notification", function(assert) {
  var oldDetermine = window.jstz.determine;

  window.jstz.determine = function() {
    return { name: function() { return 'UTC'; } };
  };

  var callType = 'call';
  var accessCountry = 'AU';
  var advisorPhoneNumber = '5553214567';
  var additionalContactDetails = 'Super keen';

  var handler = defineFixture('PUT', `/interactions/${interaction.id}`, { request: {
    "interaction": {
      "actioned": false,
      "advisor_id": "1",
      "client_access_number_country": accessCountry,
      "client_contact_id": "21387",
      "additional_contact_details": additionalContactDetails,
      "interaction_type": callType,
      "project_id": "32522",
      "requested_at": "2015-02-18T10:00:00.000Z",
      "scheduled_call_time": moment().utc().startOf('isoWeek').add(7, 'hours').toISOString(),
      "speak": true,
      "speak_phone_number": null,
      "speak_code": null,
      "advisor_phone_number": advisorPhoneNumber,
      "advisor_phone_country_code": '1',
      "used": false,
      "payment_required": true
    }
  }, response: {
    "interactions": []
  }});


  visit('/dashboard');
  click('.interactions-to-schedule article:first');

  andThen(function() {
    assert.equal($('select[name=interactionType]').val(), 'summarised_call');
  });

  // Select time slot from calendar
  // Monday 7 AM
  selectTime({ day: 0, timeSlot: 0 });

  // Set the interaction type
  select('select[name=interactionType] ', 'One-on-one');

  // Select speak dial in
  select('select[name=clientAccessNumberCountry] ', 'Australia');

  // Fill in advisor phone number
  fillIn('input[name=advisorPhoneNumber]', advisorPhoneNumber);

  // Select speak dial in
  fillIn('input[name=additionalContactDetails]', additionalContactDetails);

  // Submit form
  click("button:contains('Schedule Interaction')");

  andThen(function() {
    assert.equal(handler.called, true);

    var message = $('.messenger .messenger-message-inner').first().text().trim();
    assert.equal(message, "An interaction between Johnny Advisor and Bob Client has been scheduled.");

    window.jstz.determine = oldDetermine;
  });
});

test("Schedule interaction shows errors if validation fails", function(assert) {
  visit('/dashboard');
  click('.interactions-to-schedule article:first');
  click("button:contains('Schedule Interaction')");

  andThen(function() {
    var label = $('label[for=formattedScheduledCallTime]');
    var message = label.siblings('.error').text().trim();
    assert.equal(message, "can't be blank");
  });
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
  click("button:contains('Cancel Interaction')");
  click("button:contains('Confirm')");

  andThen(function() {
    assert.equal(currentURL(), '/dashboard',
      'returns the user to dashboard after cancelling'
    );

    assert.equal(find('.interactions-to-schedule article').length, 0,
      'removes the interaction from the widget'
    );

    var message = $('.messenger .messenger-message-inner').first().text().trim();
    assert.equal(message, "The interaction has been cancelled.");
  });
});

test("Cancel Interaction Failure", function(assert) {
  defineFixture('DELETE', '/interests/1', {
    params: { withdraw_from_compliance: 'false' },
    status: 500
  });

  visit('/dashboard');

  andThen(function() {
    assert.equal(find('.interactions-to-schedule article').length, 1,
    'shows the original interaction to schedule in the widget');
  });

  click('.interactions-to-schedule article:first');
  click("button:contains('Cancel Interaction')");
  click("button:contains('Confirm')");

  andThen(function() {
    assert.equal(find('.interactions-to-schedule article').length, 1,
      'does not remove the interaction from the widget'
    );

    var message = $('.messenger .messenger-message-inner').first().text().trim();
    assert.equal(message, "The interaction could not be cancelled.",
      'displays a message that it could not be cancelled'
    );
  });
});
