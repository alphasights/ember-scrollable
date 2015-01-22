import resolver from './helpers/resolver';
import startApp from './helpers/start-app';
import Fixtures from './helpers/fixtures';
import Ember from 'ember';

import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

QUnit.config.urlConfig.push({ id: 'nocontainer', label: 'Hide container'});
var containerVisibility = QUnit.urlParams.nocontainer ? 'hidden' : 'visible';
document.getElementById('ember-testing-container').style.visibility = containerVisibility;

export default {
  setup: function() {
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

  teardown: function() {
    this.app.fixtures.destroy();
    Ember.run(this.app, this.app.destroy);
  }
};
