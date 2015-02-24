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
          "avatarUrl": Fixtures.EMPTY_IMAGE_URL
        }
      }
    });
  },

  afterEach: function() {
    this.app.fixtures.destroy();
    Ember.run(this.app, this.app.destroy);
  }
};
