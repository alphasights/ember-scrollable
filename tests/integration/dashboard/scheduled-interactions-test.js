import Ember from 'ember';
import { test } from 'ember-qunit';
import '../../helpers/define-fixture';
import testHelper from '../../test-helper';

const project = {
  id: 32523,
  name: 'Project Name'
};

const personalAdvisor = {
  id: 256512,
  name: 'Johnny Personal Advisor',
  jobTitle: 'Vice President',
  companyName: 'Apple',
  email: 'personaladvisor@email.com',
  phoneNumber: '+1 555-123-4567',
  scheduledCallTime: '2015-02-20T10:00:00.000+00:00'
};

const clientContact = {
  id: 21388,
  name: 'Bob Client',
  email: 'client@email.com',
  phoneNumber: '+1 555-321-9000'
};

const clientAccount = {
  id: 484,
  name: 'McKinsey & Company San Francisco'
};

const team = {
  id: 136,
  name: 'NYSC18 - The McKountry Klub'
};

const primaryContact = {
  id: 1
};

QUnit.module("Scheduled interactions", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    Timecop.install();
    Timecop.freeze(moment('2015-02-20T09:30:00.000+00:00'));

    defineFixture('GET', '/interactions', { params: { primary_contact_id: "1" }, response: {
     "advisors": [
        {
          "id": personalAdvisor.id,
          "avatar_url": null,
          "emails": [personalAdvisor.email],
          "name": personalAdvisor.name,
          "phone_numbers": [personalAdvisor.phoneNumber],
          "phones": [
            {
              "number": personalAdvisor.phoneNumber,
              "type": 'mobile',
              "primary": true
            }
          ],
          "job_title": personalAdvisor.jobTitle,
          "company_name": personalAdvisor.companyName,
          "time_zone": 'Europe/Moscow'
        }
     ],
     "client_contacts": [
        {
          "id": clientContact.id,
          "avatar_url": null,
          "emails": [clientContact.email],
          "name": clientContact.name,
          "phone_numbers": [clientContact.phoneNumber],
          "phones": [
            {
              "number": clientContact.phoneNumber,
              "type": 'mobile',
              "primary": true
            }
          ],
          "client_account_id": clientAccount.id,
          "time_zone": 'Australia/Sydney'
        }
     ],
     "client_accounts": [
        {
          "id": clientAccount.id,
          "name": clientAccount.name
        }
     ],
     "projects": [
        {
          "id": project.id,
          "status": "high",
          "name": project.name,
          "client_code": "MCKU",
          "details_url": "/projects/project.id",
          "index": 3,
          "created_at": "2015-01-23T21:01:33.615+00:00",
          "angle_ids": [],
          "analyst_1_id": 6565389
        }
     ],
     "angles": [],
     "angle_team_memberships": [],
     "users": [],
     "interactions": [
        {
          "id": 1,
          "scheduled_call_time": personalAdvisor.scheduledCallTime,
          "advisor_id": personalAdvisor.id,
          "client_contact_id": clientContact.id,
          "project_id": project.id,
          "actioned": false,
          "primary_contact_id":primaryContact.id
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
      advisorPhoneNumber: $interaction.find('.advisor .phone-number:first span').text().trim(),
      clientContactName: $interaction.find('.client .name').text().trim(),
      clientAccountName: $interaction.find('.client .current-position').text().trim(),
      clientEmail: $interaction.find('.client .email span').text().trim(),
      clientPhoneNumber: $interaction.find('.client .phone-number:first span').text().trim(),
      callDate: $interaction.find('.date .day').text().trim() + " " +
                $interaction.find('.date .month').text().trim(),
      callTime: $interaction.find('.call-times .local-time').text().trim(),
      advisorCallTime: $interaction.find('.call-times .advisor span:last').text().trim(),
      clientCallTime: $interaction.find('.call-times .client span:last').text().trim(),
      advisorCallTimezone: $interaction.find('.profiles .advisor .time-zone span').text().trim(),
      clientCallTimezone: $interaction.find('.profiles .client .time-zone span').text().trim()
    };

    assert.deepEqual(interactionDetails, {
      titleProjectName: project.name,
      titleAdvisorName: personalAdvisor.name,
      advisorName: personalAdvisor.name,
      currentPosition: `${personalAdvisor.jobTitle} at ${personalAdvisor.companyName}`,
      advisorEmail: personalAdvisor.email,
      advisorPhoneNumber: personalAdvisor.phoneNumber,
      clientContactName: clientContact.name,
      clientAccountName: clientAccount.name,
      clientEmail: clientContact.email,
      clientPhoneNumber: clientContact.phoneNumber,
      callDate: '20 February',
      callTime: '10:00 AM',
      advisorCallTime: '1:00 PM',
      clientCallTime: '9:00 PM',
      advisorCallTimezone: 'MSK',
      clientCallTimezone: 'AEDT'
    });
  });
});

test("Show upcoming interactions list", function(assert) {
  visit('/dashboard');

  andThen(function() {
    var $interaction = find('.scheduled-interactions article:first');

    var interactionListItem = {
      advisorName: $interaction.find('.title span').text().trim(),
      projectName: $interaction.find('.title small').text().trim(),
      isChecklistComplete: $interaction.find('.checklist-status.complete').length === 1,
      localCallTime: $interaction.find('.time span').text().trim(),
      relativeCallTime: $interaction.find('.time small').text().trim()
    };

    assert.deepEqual(interactionListItem, {
      advisorName: personalAdvisor.name,
      projectName: project.name,
      isChecklistComplete: true,
      localCallTime: '20 Feb, 10:00 AM',
      relativeCallTime: 'in 30 minutes'
    });
  });
});

test("Team switchers displays all upcoming interactions for the team", function(assert) {
  const teamAdvisor = {
    id: 123,
    name: 'Ricky Team Advisor',
    scheduledCallTime: '2015-02-20T10:00:00.000+00:00'
  };

  defineFixture('GET', '/users/me', { response: {
    "user": {
      "id": primaryContact.id,
      "name": "Sarah Saltz",
      "time_zone": "America/New_York",
      "initials": "SSa",
      "team_id": team.id,
      "team_ids": [team.id]
    },

    "teams": [
      {
        "name" : "NYSC18 - The McKountry Klub",
        "id": team.id,
        "office": "New York"
      }
    ]
  }});

  defineFixture('GET', '/users', { params: { team_id: team.id.toString() }, response: {
    "users": [
      {
        "id": primaryContact.id,
        "name": "Sarah Saltz",
        "time_zone": "America/New_York",
        "initials": "SSa",
        "team_id": team.id
      }
    ]
  }});

  defineFixture('GET', '/interactions', { params: { team_id: team.id.toString() }, response: {
   "advisors": [
      {
        "id": personalAdvisor.id,
        "avatar_url": null,
        "emails": ['teamadvisor@email.com'],
        "name": personalAdvisor.name,
        "phone_numbers": ['+1 555-212-4567'],
        "job_title": 'President',
        "company_name": 'Samsung',
        "time_zone": 'Europe/Moscow'
      },
      {
        "id": teamAdvisor.id,
        "avatar_url": null,
        "emails": [teamAdvisor.email],
        "name": teamAdvisor.name,
        "phone_numbers": [teamAdvisor.phoneNumber],
        "job_title": teamAdvisor.jobTitle,
        "company_name": teamAdvisor.companyName,
        "time_zone": 'Europe/Moscow'
      }
   ],
   "client_contacts": [
      {
        "id": clientContact.id,
        "avatar_url": null,
        "emails": [clientContact.email],
        "name": clientContact.name,
        "phone_numbers": [clientContact.phoneNumber],
        "client_account_id": clientAccount.id,
        "time_zone": 'Australia/Sydney'
      }
   ],
   "client_accounts": [
      {
         "id": clientAccount.id,
         "name": clientAccount.name
      }
   ],
   "projects": [
      {
         "id": project.id,
         "status": "high",
         "name": project.name,
         "client_code": "MCKU",
         "details_url": "/projects/project.id",
         "index": 3,
         "created_at": "2015-01-23T21:01:33.615+00:00",
         "angle_ids": [],
         "analyst_1_id": 6565389
      }
   ],
   "angles": [],
   "angle_team_memberships": [],
   "users": [],
   "interactions": [
      {
        "id": 1,
        "scheduled_call_time": personalAdvisor.scheduledCallTime,
        "advisor_id": personalAdvisor.id,
        "client_contact_id": clientContact.id,
        "project_id": project.id,
        "actioned": false,
        "primary_contact_id":primaryContact.id
      },
      {
        "id": 2,
        "scheduled_call_time": teamAdvisor.scheduledCallTime,
        "advisor_id": teamAdvisor.id,
        "client_contact_id": clientContact.id,
        "project_id": project.id,
        "actioned": false,
        "primary_contact_id":primaryContact.id
      }
    ]
  }});

  defineFixture('GET', '/delivery_performances', { params: { team_id: team.id.toString()}, response: {
    "delivery_performances": []
  }});

  visit('/dashboard');
  select('.dashboard > header .select select', 'NYSC18 - The McKountry Klub');

  andThen(function() {
    var interactions = find('.scheduled-interactions article').toArray().map(function(interaction) {
      var $interaction = $(interaction);

      return {
        advisorName: $interaction.find('.title span').text().trim()
      };
    });

    assert.deepEqual(interactions, [{
      advisorName: personalAdvisor.name
    }, {
      advisorName: teamAdvisor.name
    }]);
  });
});
