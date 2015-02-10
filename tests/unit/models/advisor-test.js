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
    { jobTitle: 'Job Title', companyName: 'Company Name' }
  );

  equal(
    model.get('currentPosition'),
    'Job Title at Company Name',
    'returns both title and company name when available'
  );

  Ember.run(function() {
    model.set('companyName', '');
  });
  equal(
    model.get('currentPosition'),
    'Job Title',
    'only returns job title when there is no company name'
  );

  Ember.run(function() {
    model.set('jobTitle', '');
    model.set('companyName', 'Company Name');
  });
  equal(
    model.get('currentPosition'),
    'Company Name',
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
