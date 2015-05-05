import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import '../helpers/lookup';
import testHelper from '../test-helper';

QUnit.module('Preferences', {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    if (window.localStorage != null) {
      window.localStorage.clear();
    }
  },

  afterEach: function() {
    testHelper.afterEach.apply(this, arguments);
  }
});

test('sidebarCollapsed updates when toggling the sidebar', function(assert) {
  visit('/');
  click('.toggle-collapse button');

  andThen(function() {
    assert.equal(lookup('controller:currentUser').get('preferences.sidebarCollapsed'), true);
  });
});

test('sidebarCollapsed persists on page reload', function(assert) {
  visit('/');
  click('.toggle-collapse button');
  visit('/');
  click('.toggle-collapse button');

  andThen(function() {
    assert.equal(lookup('controller:currentUser').get('preferences.sidebarCollapsed'), false);
  });
});
