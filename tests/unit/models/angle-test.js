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

    this.model = this.subject();
  },

  afterEach: function() {
    Timecop.uninstall();
  }
});

test("#memberships returns the angleTeamMemberships", function(assert) {
  Ember.run(() => {
    var angleTeamMembership = this.store().createRecord('angleTeamMembership');
    angleTeamMembership.set('angle', this.model);
  });

  assert.equal(this.model.get('memberships.length'), 1);
  assert.equal(
    this.model.get('memberships'), this.model.get('angleTeamMemberships')
  );
});

//
// test("#members returns the users connected via angle team membership", function(assert) {
//   Ember.run(() => {
//     var user = this.store().createRecord('user');
//     var angleTeamMembership = this.store().createRecord('angleTeamMembership');
//     angleTeamMembership.setProperties({angle: this.model, teamMember: user});
//   });
//
//   assert.equal(this.model.get('members.length'), 1);
//   assert.equal(
//     this.model.get('members'), this.store().find('user')
//   );
// });
//
// test("changing memberships updates the membershipsUpdateAt timestamp", function(assert) {
//   assert.equal(this.model.get('membershipsUpdatedAt'), null);
//
//   var timecopTime = moment('2015-02-09T12:00:00.000+00:00');
//   Timecop.freeze(timecopTime);
//
//   Ember.run(() => {
//     var angleTeamMembership = this.store().createRecord('angleTeamMembership');
//     angleTeamMembership.set('angle', this.model);
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
