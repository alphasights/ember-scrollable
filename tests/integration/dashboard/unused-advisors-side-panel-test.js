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
          "id": unusedAdvisor.id,
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

    defineFixture('GET', '/emails', {
      params: {
        emails: '',
        page: '1',
        per_page: '10'
      },

      response: {
        'emails': []
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

const projects = [{
  id: 38748,
  name: 'Foundries',
  codename: 'The New Fab 4'
}, {
  id: 26640,
  name: 'Fabs',
  codename: 'The Fab 4'
}, {
  id: 10000,
  name: 'Hulk',
  codename: 'The Avengers'
}];

const primaryContact = {
  id: 6565392,
  avatarUrl: 'https://s3.amazonaws.com/assets_development.alphasights.com/avatars/6565392/thumb.jpg?1405522969',
  name: 'Alejandra Cordero',
  initials: 'ACo'
};

const projectHistory = [{
  id: 2265742,
  occurredAt: null,
  outreachStatus: 'found',
  projectId: 38748,
  primaryContactId: 6565392
}, {
  id: 232084,
  occurredAt: null,
  outreachStatus: 'available_to_client',
  projectId: 26640,
  primaryContactId: 6565392
}, {
  id: 2265743,
  occurredAt: '2015-02-18T10:00:00.000+00:00',
  outreachStatus: 'used',
  projectId: 10000,
  primaryContactId: 6565392
}];

test("Project history shows advisor past projects", function(assert) {
  defineFixture('GET', '/project_history', {
    params: {
      advisor_id: '10'
    },

    response: {
      "projects": [
        {
          "id": projects[0].id,
          "name": projects[0].name,
          "codename": projects[0].codename
        },
        {
          "id": projects[1].id,
          "name": projects[1].name,
          "codename": projects[1].codename
        },
        {
          "id": projects[2].id,
          "name": projects[2].name,
          "codename": projects[2].codename
        },
      ],

      "users": [
        {
          "id": primaryContact.id,
          "avatar_url": primaryContact.avatarUrl,
          "name": primaryContact.name,
          "initials": primaryContact.initials
        }
      ],

      "project_history": [
        {
          "id": projectHistory[0].id,
          "occurred_at": projectHistory[0].occurredAt,
          "outreach_status": projectHistory[0].outreachStatus,
          "project_id": projectHistory[0].projectId,
          "primary_contact_id": projectHistory[0].primaryContactId
        },
        {
          "id": projectHistory[1].id,
          "occurred_at": projectHistory[1].occurredAt,
          "outreach_status": projectHistory[1].outreachStatus,
          "project_id": projectHistory[1].projectId,
          "primary_contact_id": projectHistory[1].primaryContactId
        },
        {
          "id": projectHistory[2].id,
          "occurred_at": projectHistory[2].occurredAt,
          "outreach_status": projectHistory[2].outreachStatus,
          "project_id": projectHistory[2].projectId,
          "primary_contact_id": projectHistory[2].primaryContactId
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
        primaryContactAvatarUrl: $projectHistory.find('.primary-contact img').prop('src')
      };
    });

    assert.deepEqual(projectHistory, [{
      projectName: projects[0].name,
      projectCodeName: projects[0].codename,
      occurredAt: '',
      outreachStatus: projectHistory[0].outreachStatus,
      primaryContactAvatarUrl: primaryContact.avatarUrl
    }, {
      projectName: projects[1].name,
      projectCodeName: projects[1].codename,
      occurredAt: '',
      outreachStatus: projectHistory[1].outreachStatus,
      primaryContactAvatarUrl: primaryContact.avatarUrl
    }, {
      projectName: projects[2].name,
      projectCodeName: projects[2].codename,
      occurredAt: '30 minutes ago',
      outreachStatus: projectHistory[2].outreachStatus,
      primaryContactAvatarUrl: primaryContact.avatarUrl
    }]);
  });
});
