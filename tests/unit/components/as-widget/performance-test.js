import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('as-widget/performance', 'Component: as-widget/performable', {
});

test('currentMonthCreditCountTitle returns the current credit count rounded to the nearest tenth', function(assert) {
  var component = this.subject();

  Ember.run(function() {
    component.set('currentMonthCreditCount', 10.49);
  });

  assert.equal(
    component.get('currentMonthCreditCountTitle'),
    'Credits: 10.5'
  );
});
