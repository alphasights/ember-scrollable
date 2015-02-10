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
     "advisors":[
        {
           "id":256512,
           "avatar_url":null,
           "emails":[
             advisorEmail
           ],
           "name": advisorName,
           "phone_numbers":[
             advisorPhoneNumber
           ],
           "job_title": advisorJobTitle,
           "company_name": advisorCompanyName
        }
     ],
     "client_contacts":[
        {
           "id":21387,
           "avatar_url":null,
           "emails":[
             clientEmail
           ],
           "name": clientContactName,
           "phone_numbers":[
             clientPhoneNumber
           ],
           "client_account_id":485
        }
     ],
     "client_accounts":[
        {
           "id":485,
           "name": clientAccountName
        }
     ],
     "projects":[
        {
           "id":32522,
           "status":"high",
           "name": projectName,
           "client_code":"MCKU",
           "details_url":"/projects/32522",
           "index":3,
           "created_at":"2015-01-23T21:01:33.615+00:00",
           "angle_ids":[
              40380
           ],
           "analyst_1_id":6565389
        }
     ],
     "angles":[],
     "angle_team_memberships":[],
     "users":[],
     "interactions":[
        {
           "id":1909535,
           "scheduled_call_time":"2015-02-20T10:00:00.000-08:00",
           "advisor_id":256512,
           "client_contact_id":21387,
           "project_id":32522
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

test("Visting Interaction Side Panel Show Page", function() {
  expect(9);

  visit('/interactions/1909535');

  andThen(function() {
    equal(
      find('.interaction h1').text().trim(),
      projectName,
      'displays the project title in the heading'
    );
  });

  andThen(function() {
    equal(
      find('.advisor .name').text().trim(),
      advisorName,
      "displays the advisor's name"
    );
  });

  andThen(function() {
    equal(
      find('.job-title').text().trim(),
      `${advisorJobTitle} at ${advisorCompanyName}`,
      "displays the advisor's current position"
    );
  });

  andThen(function() {
    equal(
      find('.advisor .email span').text().trim(),
      advisorEmail,
      "displays the advisor's email address"
    );
  });

  andThen(function() {
    equal(
      find('.advisor .phone span').text().trim(),
      advisorPhoneNumber,
      "displays the advisor's phone number"
    );
  });

  andThen(function() {
    equal(
      find('.client-contact .name').text().trim(),
      clientContactName,
      "displays the client contact's name"
    );
  });

  andThen(function() {
    equal(
      find('.company-name').text().trim(),
      clientAccountName,
      "displays the client contact's company name"
    );
  });

  andThen(function() {
    equal(
      find('.client-contact .email span').text().trim(),
      clientEmail,
      "displays the client contact's current email address"
    );
  });

  andThen(function() {
    equal(
      find('.client-contact .phone span').text().trim(),
      clientPhoneNumber,
      "displays the client contact's phone number"
    );
  });
});
