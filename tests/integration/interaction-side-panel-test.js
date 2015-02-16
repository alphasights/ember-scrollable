import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import testHelper from '../test-helper';

const projectName = 'Project Name',
      advisorName = 'Johnny Advisor',
      advisorJobTitle = 'Vice President',
      advisorCompanyName = 'Apple',
      advisorEmail = 'advisor@email.com',
      advisorPhoneNumber = '+1 555-123-4567',
      clientContactName = 'Bob Client',
      clientAccountName = 'McKinsey & Company San Francisco',
      clientEmail = 'client@email.com',
      clientPhoneNumber = '+1 555-321-9000';

module("Interaction Side Panel", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    defineFixture('GET', '/interactions', { response: {
     "advisors": [
        {
          "id": 256512,
          "avatar_url": null,
          "emails": [advisorEmail],
          "name": advisorName,
          "phone_numbers": [advisorPhoneNumber],
          "job_title": advisorJobTitle,
          "company_name": advisorCompanyName
        }
     ],
     "client_contacts": [
        {
          "id": 21387,
          "avatar_url": null,
          "emails": [clientEmail],
          "name": clientContactName,
          "phone_numbers": [clientPhoneNumber],
          "client_account_id": 485
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
          "scheduled_call_time": "2015-02-20T10:00:00.000-08:00",
          "advisor_id": 256512,
          "client_contact_id": 21387,
          "project_id": 32522
        }
      ]
    }});

    defineFixture('GET', '/users', { params: { team_id: '1' }, response: {
      "users": []
    }});
  },

  afterEach: function() {
    testHelper.afterEach.apply(this, arguments);
  }
});

test("Show interaction details", function() {
  visit('/dashboard/interactions/1');

  andThen(function() {
    var interactionDetails = {
      projectName: find('.interaction h1 .project').text().trim(),
      titleAdvisorName: find('.interaction h1 .advisor').text().trim(),
      advisorName: find('.advisor .name').text().trim(),
      currentPosition: find('.job-title').text().trim(),
      advisorEmail: find('.advisor .email span').text().trim(),
      advisorPhoneNumber: find('.advisor .phone span').text().trim(),
      clientContactName: find('.client-contact .name').text().trim(),
      clientAccountName: find('.company-name').text().trim(),
      clientEmail: find('.client-contact .email span').text().trim(),
      clientPhoneNumber: find('.client-contact .phone span').text().trim()
    };

    debugger

    deepEqual(interactionDetails, {
      projectName: projectName,
      titleAdvisorName: advisorName,
      advisorName: advisorName,
      currentPosition: `${advisorJobTitle} at ${advisorCompanyName}`,
      advisorEmail: advisorEmail,
      advisorPhoneNumber: advisorPhoneNumber,
      clientContactName: clientContactName,
      clientAccountName: clientAccountName,
      clientEmail: clientEmail,
      clientPhoneNumber: clientPhoneNumber
    });
  });
});
