import Ember from 'ember';

Ember.Test.registerHelper('defineFixture', function(app, ...args) {
  return app.fixtures.define(...args);
});
