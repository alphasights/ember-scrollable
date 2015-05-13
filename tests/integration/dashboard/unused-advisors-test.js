import Ember from 'ember';
import { test } from 'ember-qunit';
import '../../helpers/define-fixture';
import testHelper from '../../test-helper';

const unusedAdvisor = {
  advisorName: 'Johnny Advisor',
  projectName: 'Project Name',
  termsSentAt: '2015-02-18T10:00:00.000+00:00'
};

QUnit.module("Interactions To Schedule Widget", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    Timecop.install();
    Timecop.freeze(moment('2015-02-18T10:30:00.000+00:00'));

    defineFixture('GET', '/unused_advisors', { response: {
      "unused_advisors": [
        {
          "id": 1,
          "name": unusedAdvisor.advisorName,
          "project_id": 32522,
          "terms_sent_at": unusedAdvisor.termsSentAt
        }
      ],

      "projects": [
        {
          "id": 32522,
          "status": "high",
          "name": unusedAdvisor.projectName,
          "client_code": "MCKU",
          "details_url": "/projects/32522",
          "index": 3,
          "created_at": "2015-01-23T21:01:33.615+00:00",
          "angle_ids": [40380],
          "analyst_1_id": 6565389
        }
      ]
    }});
  },

  afterEach: function() {
    testHelper.afterEach.apply(this, arguments);
    Timecop.uninstall();
  }
});


test("Show unused advisors list", function(assert) {
  visit('/dashboard');

  andThen(function() {
    var $unusedAdvisor = find('.unused-advisors article:first');

    var unusedAdvisorListItem = {
      advisorName: $unusedAdvisor.find('.title span').text().trim(),
      projectName: $unusedAdvisor.find('.title small').text().trim(),
      termsSentAt: $unusedAdvisor.find('.time span').text().trim()
    };

    assert.deepEqual(unusedAdvisorListItem, {
      advisorName: unusedAdvisor.advisorName,
      projectName: unusedAdvisor.projectName,
      termsSentAt: 'Terms sent 30 minutes ago'
    });

    assert.equal(find('.unused-advisors article').length, 1);
  });
});
