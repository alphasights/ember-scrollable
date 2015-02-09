import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('advisor', 'Advisor', {
  needs: ['model:interaction', 'model:client-contact', 'model:project']
});

test('it exists', function() {
  var model = this.subject();
  ok(!!model);
});

test('currentPosition joins jobTitle and companyName', function() {
  var model = this.subject(
    { jobTitle: 'Big Boss Man', companyName: 'LOL Incorporated' }
  );

  equal(
    model.get('currentPosition'),
    'Big Boss Man at LOL Incorporated',
    'Includes both title and company when available'
  );

  Ember.run(function() {
    model.set('companyName', '');
  });

  equal(
    model.get('currentPosition'),
    'Big Boss Man',
    'Only includes job title when there is no company name'
  );
});
