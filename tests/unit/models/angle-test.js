import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('angle', 'Angle', {
  needs: [
    'model:angle', 'model:angleTeamMembership', 'model:project', 'model:user',
    'model:interaction'
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
    angleTeamMembership = this.store().push('angleTeamMembership', { id: 3, angle: 1 });
  });

  assert.equal(this.model.get('memberships.length'), 1);
  assert.ok(
    this.model.get('memberships').indexOf(angleTeamMembership) === 0,
    "returns the correct membership in the angle's memberships"
  );
});


test("#members returns the users connected via angle team membership", function(assert) {
  var user, angleTeamMembership;

  Ember.run(() => {
    user = this.store().push('user', { id: 2, angles: [1] });
    angleTeamMembership = this.store().push('angleTeamMembership', { id: 3, angle: 1, teamMember: 2 });
  });

  assert.equal(this.model.get('members.length'), 1);

  assert.ok(
    this.model.get('members').indexOf(user) === 0,
    "returns the correct member in the angle's members"
  );
});


// test("changing memberships updates the membershipsUpdateAt timestamp", function(assert) {
//   assert.equal(this.model.get('membershipsUpdatedAt'), null);
//
//   var timecopTime = moment('2015-02-09T12:00:00.000+00:00');
//   Timecop.freeze(timecopTime);
//
//   Ember.run(() => {
//     var angleTeamMembership = this.store().createRecord('angleTeamMembership');
//     this.model.get('angleTeamMemberships').pushObject(angleTeamMembership);
//   });
//
//   assert.equal(
//     this.model.get('membershipsUpdatedAt'), timecopTime.toDate().toTimeString()
//   );
// });
//
// test("changing members updates the membersUpdateAt timestamp", function(assert) {
//   assert.equal(this.model.get('membersUpdatedAt'), null);
//
//   var timecopTime = moment('2015-02-09T12:00:00.000+00:00');
//   Timecop.freeze(timecopTime);
//
//   Ember.run(() => {
//     var user = this.store().createRecord('user');
//     var angleTeamMembership = this.store().createRecord('angleTeamMembership');
//     angleTeamMembership.setProperties({angle: this.model, teamMember: user});
//   });
//
//   assert.equal(
//     this.model.get('membersUpdatedAt'), timecopTime.toDate().toTimeString()
//   );
// });
