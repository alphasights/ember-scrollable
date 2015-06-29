import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('as-text-ellipsis', 'Component: as-text-ellipsis', {
});

test('isTextAbridged returns true when the text length is greater than the character limit', function(assert) {
  var component = this.subject();

  Ember.run(function() {
    component.set('characterLimit', 1);
    component.set('text', 'OK');
  });

  assert.equal(component.get('isTextAbridged'), true);
});

test('isTextAbridged returns false when the text length is not greater than the character limit', function(assert) {
  var component = this.subject();

  Ember.run(function() {
    component.set('characterLimit', 2);
    component.set('text', 'OK');
  });

  assert.equal(component.get('isTextAbridged'), false);
});


test('abridgedText replaces text after the character limit with ellipsis', function(assert) {
  var component = this.subject();

  Ember.run(function() {
    component.set('characterLimit', 2);
    component.set('text', 'Okay');
  });

  assert.equal(component.get('abridgedText'), 'Ok...');
});
