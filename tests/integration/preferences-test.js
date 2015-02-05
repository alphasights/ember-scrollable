import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import testHelper from '../test-helper';

var currentUser = function() {
  return window.Phoenix.__container__.lookup('controller:currentUser');
};

module('Preferences', {
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

test('sidebarCollapsed updates when toggling the sidebar', function() {
  visit('/');
  click('.toggle-collapse button');

  andThen(function(){
    equal(currentUser().get('preferences.sidebarCollapsed'), true);
  });
});
