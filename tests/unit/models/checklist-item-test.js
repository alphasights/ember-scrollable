import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('checklist-item', 'ChecklistItem', {
  needs: [
    'model:interaction', 'model:advisor', 'model:client-contact', 'model:project'
  ]
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
