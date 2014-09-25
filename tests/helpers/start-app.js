import Ember from 'ember';
import Application from 'phoenix/app';
import Router from 'phoenix/router';

export default function startApp(attrs) {
  var App;

  var attributes = Ember.merge({
    rootElement: '#ember-testing',
    LOG_ACTIVE_GENERATION: false,
    LOG_VIEW_LOOKUPS: false
  }, attrs);

  Router.reopen({
    location: 'none'
  });

  Ember.run(function() {
    App = Application.create(attributes);
    App.setupForTesting();
    App.injectTestHelpers();
  });

  App.reset();

  return App;
}
