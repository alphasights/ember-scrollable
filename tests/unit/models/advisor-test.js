import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('advisor', 'Advisor', {
  needs: [
    'model:interaction', 'model:client-contact', 'model:project',
    'model:checklist-item', 'model:user'
  ],

  beforeEach: function() {
    this.model = this.subject(
      { jobTitle: 'Job Title', companyName: 'Company Name' }
    );
  }
});

test('#currentPosition returns both title and company name when available', function(assert) {
  assert.equal(this.model.get('currentPosition'), 'Job Title at Company Name');
});

test('#currentPosition only returns job title when there is no company name', function(assert) {
  Ember.run(() => {
    this.model.set('companyName', '');
  });

  assert.equal(this.model.get('currentPosition'), 'Job Title');
});

test('#currentPosition only returns company name when there is no job title', function(assert) {
  Ember.run(() => {
    this.model.set('jobTitle', '');
    this.model.set('companyName', 'Company Name');
  });

  assert.equal(this.model.get('currentPosition'), 'Company Name');
});

test('#currentPosition returns an empty string when there is no job title or company name', function(assert) {
  Ember.run(() => {
    this.model.set('jobTitle', '');
    this.model.set('companyName', '');
  });

  assert.equal(this.model.get('currentPosition'), '');
});

test("#pistachioUrl returns the correct url for the advisor", function(assert) {
  this.model.set('id', '99');

  assert.equal(this.model.get('pistachioUrl'),'http://localhost:3000/advisors/99');
});
