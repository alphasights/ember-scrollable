import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('client-contact', 'ClientContact', {
  needs: [
    'model:client-contact', 'model:client-account', 'model:interaction',
    'model:advisor', 'model:project', 'model:checklist-item'
  ],

  beforeEach: function() {
    this.model = this.subject();
  }
});


test("#pistachioUrl returns the correct url for the advisor", function(assert) {
  this.model.set('id', 99);

  assert.equal(
    this.model.get('pistachioUrl'),
    'http://localhost:3000/client/contacts/99'
  )
});
