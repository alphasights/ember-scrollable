import resolver from './helpers/resolver';
import startApp from './helpers/start-app';
import Fixtures from './helpers/fixtures';
import Ember from 'ember';

import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

QUnit.urlParams.nocontainer = true;

export default {
  beforeEach: function() {
    this.app = startApp();
    this.app.fixtures = Fixtures.create();

    this.app.fixtures.define('GET', '/users/me', {
      response: {
        "user": {
          "initials": "EU",
          "id": 1,
          "teamId": 1,
          "avatarUrl": Fixtures.EMPTY_IMAGE_URL,
          "timeZone": "Etc/UTC"
        }
      }
    });

    this.app.fixtures.define('GET', '/delivery_performances/me', { response: {
      "delivery_performance": {
        "id": 1,
        "user_id": 1,
        "current_month_credit_count": 0,
        "monthly_target": 0
      }
    }});

    this.app.fixtures.define('GET', '/interactions', { response: {
      "interactions": []
    }});

    this.app.fixtures.define('GET', '/dial_ins', { response: {
      "dial_ins": []
    }});
  },

  afterEach: function() {
    this.app.fixtures.destroy();
    Ember.run(this.app, this.app.destroy);
  }
};
