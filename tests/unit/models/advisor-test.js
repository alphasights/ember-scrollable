import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('advisor', 'Advisor', {
  needs: ['model:interaction', 'model:client-contact', 'model:project'],

  beforeEach: function() {
    this.model = this.subject(
      { jobTitle: 'Job Title', companyName: 'Company Name' }
    );
  }
});

test('#currentPosition returns both title and company name when available', function() {
  equal(this.model.get('currentPosition'), 'Job Title at Company Name');
});

test('#currentPosition only returns job title when there is no company name', function() {
  Ember.run(() => {
    this.model.set('companyName', '');
  });

  equal(this.model.get('currentPosition'), 'Job Title');
});

test('#currentPosition only returns company name when there is no job title', function() {
  Ember.run(() => {
    this.model.set('jobTitle', '');
    this.model.set('companyName', 'Company Name');
  });

  equal(this.model.get('currentPosition'), 'Company Name');
});

test('#currentPosition returns an empty string when there is no job title or company name', function () {
  Ember.run(() => {
    this.model.set('jobTitle', '');
    this.model.set('companyName', '');
  });

  equal(this.model.get('currentPosition'), '');
});
