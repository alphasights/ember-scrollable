import Ember from 'ember';
import { test } from 'ember-qunit';
import '../helpers/define-fixture';
import testHelper from '../test-helper';

QUnit.module('Dashboard', testHelper);

test('Switching to a whiteboard triggers the right requests', function(assert) {
  let interactionsHandler = defineFixture('GET', '/interactions', {
    params: { whiteboard_id: '1' },
    response: {
      "projects": []
    }
  });

  let usersHandler = defineFixture('GET', '/users', {
    params: { whiteboard_id: '1' },
    response: {
      "users": []
    }
  });

  let deliverPerformancesHandler = defineFixture('GET', '/delivery_performances', {
    params: { whiteboard_id: '1' },
    response: {
      "delivery_performances": []
    }
  });

  visit('/dashboard');

  select('.dashboard > header .select select', 'Cool whiteboard');

  andThen(function() {
    assert.equal(interactionsHandler.called, true);
    assert.equal(usersHandler.called, true);
    assert.equal(deliverPerformancesHandler.called, true);
  });
});
