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

test("#priorityIndex returns the index of the corresponding priority", function(assert) {
  Ember.run(() => {
    this.model.set('priority', 'medium');
  });

  assert.equal(this.model.get('priorityIndex'), 1);
});

test("#pistachioUrl returns the project's url in pistachio", function(assert) {
  Ember.run(() => {
    this.model.set('id', 99);
  });

  assert.equal(
    this.model.get('pistachioUrl'), 'http://localhost:3000/projects/99'
  );
});
