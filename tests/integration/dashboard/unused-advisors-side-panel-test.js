import Ember from 'ember';
import { test } from 'ember-qunit';
import '../../helpers/define-fixture';
import testHelper from '../../test-helper';

const unusedAdvisor = {
  id: 1,
  advisorName: 'Johnny Advisor'
};

QUnit.module("Unused Advisors Side Panel", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    Timecop.install();
    Timecop.freeze(moment('2015-02-18T10:30:00.000+00:00'));

    defineFixture('GET', '/unused_advisors', { response: {
      "unused_advisors": [
        {
          "id": 1,
          "name": unusedAdvisor.advisorName,
          "terms_sent_at": '2015-02-18T10:00:00.000+00:00',
          "project_id": 32522,
          "advisor_id": 10
        }
      ],

      "projects": [
        {
          "id": 32522,
          "name": "Project Name",
          "codename": "Internal Project title"
        }
      ],

      "advisors": [
        {
          "id": 10,
          "avatar_url": EmberENV.blankAvatarUrl,
          "name": unusedAdvisor.advisorName,
          "time_zone": null,
          "emails": [],
          "job_title": 'Boss',
          "company_name": 'Life, Inc.',
          "phone_numbers": [],
          "phones": []
        }
      ]
    }});

    defineFixture('GET', '/project_history', {
      params: {
        advisor_id: '10'
      },

      response: {
        "project_history": []
      }
    });

    defineFixture('GET', '/email_templates', {
      params: { purpose: 'Unused Advisor' },

      response: {
        "email_templates": []
      }
    });

    defineFixture('GET', '/email_variables', {
      params: {
        concerning_id: unusedAdvisor.id.toString(),
        concerning_type: 'email/unused_advisorship_email'
      },

      response: {
        "email_variables": []
      }
    });
  },

  afterEach: function() {
    testHelper.afterEach.apply(this, arguments);
    Timecop.uninstall();
  }
});

test("Remove unused advisor from side panel", function(assert) {
  visit('/dashboard');

  andThen(function() {
    assert.equal(find('.unused-advisors article').length, 1);
  });

  defineFixture('DELETE', '/unused_advisors/1');
  click('.unused-advisors article:first');
  click("button.remove");
  click("button:contains('Yes, Remove Advisor')");

  andThen(function() {
    assert.equal(find('.unused-advisors article').length, 0);

    var message = $('.messenger .messenger-message-inner').first().text().trim();
    assert.equal(message, `The advisor ${unusedAdvisor.advisorName} was removed from the list.`);
  });
});

test("Project history shows advisor past projects", function(assert) {
  defineFixture('GET', '/project_history', {
    params: {
      advisor_id: '10'
    },

    response: {
      "projects": [
        {
          "id": 38748,
          "name": "Foundries",
          "codename": "The New Fab 4"
        },
        {
          "id": 26640,
          "name": "Fabs",
          "codename": "The Fab 4"
        },
        {
          "id": 10000,
          "name": "Hulk",
          "codename": "The Avengers"
        }
      ],
      "users": [
        {
          "id": 6565392,
          "avatar_url": "https://s3.amazonaws.com/assets_development.alphasights.com/avatars/6565392/thumb.jpg?1405522969",
          "name": "Alejandra Cordero",
          "time_zone": "America/New_York",
          "initials": "ACo",
          "team_id": 99,
          "developer": false
        }
      ],
      "project_history": [
        {
          "id": 2265742,
          "occurred_at": null,
          "outreach_status": "found",
          "project_id": 38748,
          "primary_contact_id": 6565392
        },
        {
          "id": 232084,
          "occurred_at": null,
          "outreach_status": "available_to_client",
          "project_id": 26640,
          "primary_contact_id": 6565392
        },
        {
          "id": 2265743,
          "occurred_at": '2015-02-18T10:00:00.000+00:00',
          "outreach_status": "used",
          "project_id": 10000,
          "primary_contact_id": 6565392
        },
      ]
    }
  });

  visit('/dashboard');
  click('.unused-advisors article:first');
  click('.project-history .header span');

  andThen(function() {
    var projectHistory = find('.project-history tr').toArray().map(function(projectHistory) {
      var $projectHistory = $(projectHistory);

      return {
        projectName: $projectHistory.find('.project .name').text().trim(),
        projectCodeName: $projectHistory.find('.project .codename').text().trim(),
        occurredAt: $projectHistory.find('.occurred-at').text().trim(),
        outreachStatus: $projectHistory.find('.outreach-status i').prop('class'),
        primaryContact: $projectHistory.find('.primary-contact img').prop('src')
      };
    });

    assert.deepEqual(projectHistory, [{
      projectName: 'Foundries',
      projectCodeName: 'The New Fab 4',
      occurredAt: '',
      outreachStatus: 'found',
      primaryContact: 'https://s3.amazonaws.com/assets_development.alphasights.com/avatars/6565392/thumb.jpg?1405522969'
    }, {
      projectName: 'Fabs',
      projectCodeName: 'The Fab 4',
      occurredAt: '',
      outreachStatus: 'available-to-client',
      primaryContact: 'https://s3.amazonaws.com/assets_development.alphasights.com/avatars/6565392/thumb.jpg?1405522969'
    }, {
      projectName: 'Hulk',
      projectCodeName: 'The Avengers',
      occurredAt: '18 Feb 2015 (30 minutes ago)',
      outreachStatus: 'used',
      primaryContact: 'https://s3.amazonaws.com/assets_development.alphasights.com/avatars/6565392/thumb.jpg?1405522969'
    }]);
  });
});
