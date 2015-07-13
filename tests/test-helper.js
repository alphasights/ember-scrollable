import resolver from './helpers/resolver';
import select from './helpers/select';
import startApp from './helpers/start-app';
import Fixtures from './helpers/fixtures';
import Ember from 'ember';

import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

export default {
  beforeEach: function() {
    this.app = startApp();
    this.app.fixtures = Fixtures.create();

    this.app.fixtures.define('GET', '/users/me', {
      response: {
        "user": {
          "name": "Example User",
          "initials": "EU",
          "id": 1,
          "teamId": 1,
          "avatarUrl": Fixtures.EMPTY_IMAGE_URL,
          "timeZone": "Etc/UTC",
          "email": 'example@user.com'
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

    this.app.fixtures.define('GET', '/interactions', { params: { primary_contact_id: "1" }, response: {
      "interactions": []
    }});

    this.app.fixtures.define('GET', '/teams', { response: {
      "teams": [{
        "name": "Example Team",
        "id": 1,
        "office": "Example Office"
      }, {
        "name": "Example Team 2",
        "id": 2,
        "office": "Example Office"
      }]
    }});

    this.app.fixtures.define('GET', '/unused_advisors', { response: {
      "unused_advisors": []
    }});

    this.app.fixtures.define('GET', '/interaction_types', { response: {
      "interaction_types": {
        "call": "One-on-one Call",
        "hosted_call": 'Hosted Call',
        "summarised_call": 'Interaction Summary'
      },
      "classifications": {
        "hosted": [
          "hosted_call",
          "summarised_call"
        ],
        "duration_based": [
          "call"
        ]
      }
    }});

    this.app.fixtures.define('GET', '/dial_ins', { response: {
      "dial_ins":{
        "AU":"Australia",
        "AT":"Austria",
        "BE":"Belgium"
      }
    }});
  },

  afterEach: function() {
    /* jshint newcap: false */
    Messenger().hideAll();
    /* jshint newcap: true */

    this.app.fixtures.destroy();
    Ember.run(this.app, this.app.destroy);
  }
};
