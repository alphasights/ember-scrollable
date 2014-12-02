import {
  moduleFor,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleFor('view:sidebar', 'SidebarView');

test('isCollapsed equals the sidebarCollapsed preference', function() {
  var view = this.subject({ controller: Ember.Controller.create({
    preferences: Ember.Object.create({ sidebarCollapsed: true })
  })});

  equal(view.get('isCollapsed'), true);
});
