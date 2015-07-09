import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('interaction', 'Interaction', {
  needs: [
    'model:interaction', 'model:advisor', 'model:project', 'model:angle',
    'model:angleTeamMembership', 'model:checklist-item', 'model:client-contact', 'model:client-account',
    'model:user', 'model:delivery-performance', 'model:interaction-completion'
  ],

  beforeEach: function() {
    this.model = this.subject();
  }
});

test("#pistachioUrl returns the correct url for the interaction", function(assert) {
  Ember.run(() => {
    this.model.set('id', 99);
  });

  assert.equal(this.model.get('pistachioUrl'),'http://localhost:3000/interactions/99');
});

test("checklistUrl returns the correct url for the interaction", function(assert) {
  Ember.run(() => {
    var project = this.store().createRecord('project', { id: 101 });

    this.model.setProperties({id: 99, project: project});
  });

  assert.equal(
    this.model.get('checklistUrl'),
    'http://localhost:3000/projects/101/proposal#checklist_99'
  );
});

test("schedulingUrl returns the correct url for the interaction", function(assert) {
  Ember.run(() => {
    var project = this.store().createRecord('project', { id: 101 });

    this.model.setProperties({id: 99, project: project});
  });

  assert.equal(
    this.model.get('schedulingUrl'),
    'http://localhost:3000/projects/101/proposal#scheduling_99'
  );
});
