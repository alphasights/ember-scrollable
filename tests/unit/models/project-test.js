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
  Ember.run(() => {
    var firstAngle = this.store().createRecord('angle', { project: this.model });
    var secondAngle = this.store().createRecord('angle', { project: this.model });

    var firstMembership = this.store().createRecord(
      'angleTeamMembership', { angle: firstAngle }
    );
    var secondMembership = this.store().createRecord(
      'angleTeamMembership', { angle: firstAngle }
    );
    var thirdMembership = this.store().createRecord(
      'angleTeamMembership', { angle: secondAngle}
    );
  });

  assert.equal(this.model.get('memberships.length'), 3);

  // assert.equal(
  //   this.model.get('memberships'),
  //   this.store().find('angleTeamMembership')
  // );
});

test("#members returns all the unique users working on a project", function(assert) {
  Ember.run(() => {
    var firstAngle = this.store().createRecord('angle', { project: this.model });
    var secondAngle = this.store().createRecord('angle', { project: this.model });
    var johnCST = this.store().createRecord('user');
    var joeCST = this.store().createRecord('user');

    var firstMembership = this.store().createRecord(
      'angleTeamMembership', { angle: firstAngle, teamMember: johnCST }
    );
    var secondMembership = this.store().createRecord(
      'angleTeamMembership', { angle: firstAngle, teamMember: johnCST }
    );
    var thirdMembership = this.store().createRecord(
      'angleTeamMembership', { angle: secondAngle, teamMember: joeCST }
    );
  });

  assert.equal(this.model.get('members.length'), 2);

  // assert.equal(
  //   this.model.get('members'),
  //   this.store().find('user')
  // );
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
