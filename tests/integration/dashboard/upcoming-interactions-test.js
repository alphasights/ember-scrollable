import Ember from 'ember';
import { test } from 'ember-qunit';
import '../../helpers/define-fixture';
import testHelper from '../../test-helper';

const projectName = 'Project Name',
      advisorName = 'Johnny Advisor',
      advisorJobTitle = 'Vice President',
      advisorCompanyName = 'Apple',
      advisorEmail = 'advisor@email.com',
      advisorPhoneNumber = '+1 555-123-4567',
      advisorTimeZone = 'Europe/Moscow',
      clientContactName = 'Bob Client',
      clientAccountName = 'McKinsey & Company San Francisco',
      clientEmail = 'client@email.com',
      clientPhoneNumber = '+1 555-321-9000',
      clientTimeZone = 'Australia/Sydney',
      checklistStatus = 'Checklist Complete',
      scheduledCallTime = '2015-02-20T10:00:00.000+00:00';

QUnit.module("Upcoming interactions", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    Timecop.install();
    Timecop.freeze(moment('2015-02-20T09:30:00.000+00:00'));

    defineFixture('GET', '/interactions', { params: { team_id: '' }, response: {
     "advisors": [
        {
          "id": 256512,
          "avatar_url": null,
          "emails": [advisorEmail],
          "name": advisorName,
          "phone_numbers": [advisorPhoneNumber],
          "job_title": advisorJobTitle,
          "company_name": advisorCompanyName,
          "time_zone": advisorTimeZone
        }
     ],
     "client_contacts": [
        {
          "id": 21387,
          "avatar_url": null,
          "emails": [clientEmail],
          "name": clientContactName,
          "phone_numbers": [clientPhoneNumber],
          "client_account_id": 485,
          "time_zone": clientTimeZone
        }
     ],
     "client_accounts": [
        {
           "id": 485,
           "name": clientAccountName
        }
     ],
     "projects": [
        {
           "id": 32522,
           "status": "high",
           "name": projectName,
           "client_code": "MCKU",
           "details_url": "/projects/32522",
           "index": 3,
           "created_at": "2015-01-23T21:01:33.615+00:00",
           "angle_ids": [40380],
           "analyst_1_id": 6565389
        }
     ],
     "angles": [],
     "angle_team_memberships": [],
     "users": [],
     "interactions": [
        {
          "id": 1,
          "scheduled_call_time": scheduledCallTime,
          "advisor_id": 256512,
          "client_contact_id": 21387,
          "project_id": 32522,
          "actioned": false,
          "primary_contact_id":6565427
        }
      ]
    }});

    defineFixture('GET', '/users/me', { response: {
      "user": {
        "id": 6565427,
        "name": "Sarah Saltz",
        "time_zone": "America/New_York",
        "initials": "SSa",
        "team_id": 136
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

test("Show interaction details", function(assert) {
  visit('/dashboard/interactions/1');

  andThen(function() {
    var $interaction = find('.interaction');

    var interactionDetails = {
      titleProjectName: $interaction.find('h1 small').text().trim(),
      titleAdvisorName: $interaction.find('h1 span').text().trim(),
      advisorName: $interaction.find('.advisor .name').text().trim(),
      currentPosition: $interaction.find('.advisor .current-position').text().trim(),
      advisorEmail: $interaction.find('.advisor .email span').text().trim(),
      advisorPhoneNumber: $interaction.find('.advisor .phone-number span').text().trim(),
      clientContactName: $interaction.find('.client .name').text().trim(),
      clientAccountName: $interaction.find('.client .current-position').text().trim(),
      clientEmail: $interaction.find('.client .email span').text().trim(),
      clientPhoneNumber: $interaction.find('.client .phone-number span').text().trim(),
      callDate: $interaction.find('.date-time .date').text().trim(),
      callTime: $interaction.find('.date-time .time').text().trim(),
      advisorCallTime: $interaction.find('.profiles .advisor .call-time span').text().trim(),
      clientCallTime: $interaction.find('.profiles .client .call-time span').text().trim()
    };

    assert.deepEqual(interactionDetails, {
      titleProjectName: projectName,
      titleAdvisorName: advisorName,
      advisorName: advisorName,
      currentPosition: `${advisorJobTitle} at ${advisorCompanyName}`,
      advisorEmail: advisorEmail,
      advisorPhoneNumber: advisorPhoneNumber,
      clientContactName: clientContactName,
      clientAccountName: clientAccountName,
      clientEmail: clientEmail,
      clientPhoneNumber: clientPhoneNumber,
      callDate: '20 February',
      callTime: '10:00 AM',
      advisorCallTime: '1:00 PM MSK',
      clientCallTime: '9:00 PM AEDT'
    });
  });
});

test("Show upcoming interactions list", function(assert) {
  visit('/dashboard');

  andThen(function() {
    var $interaction = find('.upcoming-interactions article:first');

    var interactionListItem = {
      advisorName: $interaction.find('.title span').text().trim(),
      projectName: $interaction.find('.title small').text().trim(),
      isChecklistComplete: $interaction.find('.checklist-status.complete').length === 1,
      localCallTime: $interaction.find('.time span').text().trim(),
      relativeCallTime: $interaction.find('.time small').text().trim()
    };

    assert.deepEqual(interactionListItem, {
      advisorName: advisorName,
      projectName: projectName,
      isChecklistComplete: true,
      localCallTime: '20 Feb, 10:00 AM',
      relativeCallTime: 'in 30 minutes'
    });
  });
});
