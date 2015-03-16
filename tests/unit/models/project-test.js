import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('project', 'Project', {
  needs: [
    'model:project', 'model:angle-team-membership', 'model:angle', 'model:user',
    'model:interaction', 'model:advisor', 'model:checklist-item',
    'model:client-contact'
  ],

  beforeEach: function() {
    this.model = this.subject();
  }
});

test("#memberships returns all the memberships across a project's angles", function(assert) {
  var firstMembership;
  var secondMembership;
  var thirdMembership;

  Ember.run(() => {
    var firstAngle = this.store().createRecord('angle', { project: this.model });
    var secondAngle = this.store().createRecord('angle', { project: this.model });

    firstMembership = this.store().createRecord(
      'angleTeamMembership', { angle: firstAngle }
    );
    secondMembership = this.store().createRecord(
      'angleTeamMembership', { angle: firstAngle }
    );
    thirdMembership = this.store().createRecord(
      'angleTeamMembership', { angle: secondAngle}
    );
  });

  assert.equal(this.model.get('memberships.length'), 3);

  [
    firstMembership,
    secondMembership,
    thirdMembership
  ].forEach((membership, index) => {
    assert.ok(this.model.get('memberships')[index] === membership,
    "contains each membership in the project's memberships' array");
  });
});

test("#members returns all the unique users working on a project", function(assert) {
  var firstMember;
  var secondMember;

  Ember.run(() => {
    var firstAngle = this.store().createRecord('angle', { project: this.model });
    var secondAngle = this.store().createRecord('angle', { project: this.model });
    firstMember = this.store().createRecord('user');
    secondMember = this.store().createRecord('user');

    var firstMembership = this.store().createRecord(
      'angleTeamMembership', { angle: firstAngle, teamMember: firstMember }
    );
    var secondMembership = this.store().createRecord(
      'angleTeamMembership', { angle: firstAngle, teamMember: firstMember }
    );
    var thirdMembership = this.store().createRecord(
      'angleTeamMembership', { angle: secondAngle, teamMember: secondMember }
    );
  });

  assert.equal(this.model.get('members.length'), 2);

  [firstMember, secondMember].forEach((member) => {
    assert.ok(this.model.get('members').indexOf(member) >= 0,
    "contains each member in the project's members' array");
  });
});

test("#priorityIndex returns the index of the corresponding priority", function(assert) {
  Ember.run(() => {
    this.model.set('priority', 'medium');
  });

  assert.equal(this.model.get('priorityIndex'), 1);
});

test("#deliveryTarget returns the sum of of the angles' memberships targets", function(assert)  {
  Ember.run(() => {
    var firstAngle = this.store().createRecord('angle', { project: this.model });
    this.store().createRecord(
      'angleTeamMembership', { angle: firstAngle, targetValue: 6 }
    );
    this.store().createRecord(
      'angleTeamMembership', { angle: firstAngle, targetValue: 4 }
    );

    var secondAngle = this.store().createRecord('angle', { project: this.model });
    this.store().createRecord(
      'angleTeamMembership', { angle: secondAngle, targetValue: 5 }
    );
  });

  assert.equal(this.model.get('deliveryTarget'), 15);
});

test("#pistachioUrl returns the project's url in pistachio", function(assert) {
  Ember.run(() => {
    this.model.set('id', 99);
  });

  assert.equal(
    this.model.get('pistachioUrl'), 'http://localhost:3000/projects/99'
  );
});
