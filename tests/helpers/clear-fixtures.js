import Ember from 'ember';

Ember.Test.registerHelper('clearFixtures', function(app, ...args) {
  return app.fixtures.clear(...args);
});
