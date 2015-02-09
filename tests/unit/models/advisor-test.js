import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('advisor', 'Advisor', {
  needs: ['model:interaction', 'model:client-contact', 'model:project']
});

test('#currentPosition', function() {
  expect(4);

  var model = this.subject(
    { jobTitle: 'Big Boss Man', companyName: 'LOL Incorporated' }
  );

  equal(
    model.get('currentPosition'),
    'Big Boss Man at LOL Incorporated',
    'returns both title and company name when available'
  );

  Ember.run(function() {
    model.set('companyName', '');
  });
  equal(
    model.get('currentPosition'),
    'Big Boss Man',
    'only returns job title when there is no company name'
  );

  Ember.run(function() {
    model.set('jobTitle', '');
    model.set('companyName', 'LOL Incorporated');
  });
  equal(
    model.get('currentPosition'),
    'LOL Incorporated',
    'only returns company name when there is no job title'
  );

  Ember.run(function() {
    model.set('jobTitle', '');
    model.set('companyName', '');
  });
  equal(
    model.get('currentPosition'),
    '',
    'returns an empty string when there is no job title or company name'
  );
});
