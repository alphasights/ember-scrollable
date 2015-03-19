import Ember from 'ember';

Ember.Test.registerHelper('lookup', function(app, path) {
  return app.__container__.lookup(path);
});
