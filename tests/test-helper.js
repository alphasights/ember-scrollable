import resolver from './helpers/resolver';
import startApp from './helpers/start-app';
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
    window.app = startApp();
    window.app.server = new Pretender();

    defineFixture('/users/me', {}, {
      "user": {
        "initials": "EU",
        "id": 1
      }
    });
  },

  teardown: function() {
    window.app.server.shutdown();
    Ember.run(window.app, window.app.destroy);
  }
};
