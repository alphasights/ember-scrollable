import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('angle', 'Angle', {
  needs: [
    'model:angle', 'model:angleTeamMembership', 'model:project', 'model:user',
    'model:interaction', 'model:delivery-performance'
  ],

  beforeEach: function() {
    Timecop.install();

    Ember.run(() => {
      this.store().unloadAll('angle');
      this.store().unloadAll('angleTeamMembership');
      this.store().unloadAll('user');

      this.model = this.store().push('angle', { id: 1 });
    });
  },

  afterEach: function() {
    Timecop.uninstall();
  }
});

test("#memberships returns the angleTeamMemberships", function(assert) {
  var angleTeamMembership;

  Ember.run(() => {
    angleTeamMembership = this.store().push(
      'angleTeamMembership', { id: 3, angle: 1 }
    );
  });

  this.model.get('memberships').forEach((membership) => {
    assert.ok(membership === angleTeamMembership);
  }, 'contains the correct angle team membership in the memberships array');
});


test("#members returns the users connected via angle team membership", function(assert) {
  var user, angleTeamMembership;

  Ember.run(() => {
    user = this.store().push('user', { id: 2, angles: [1] });
    angleTeamMembership = this.store().push(
      'angleTeamMembership', { id: 3, angle: 1, teamMember: 2 }
    );
  });

  this.model.get('members').forEach((member) => {
    assert.ok(member === user);
  }, 'contains the correct user in the members array');
});
