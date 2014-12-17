import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

if (window.__env != null) {
  window.EmberENV.pistachioUrl = window.__env.pistachioUrl;
  window.EmberENV.apiBaseUrl = window.__env.apiBaseUrl;
  window.EmberENV.segmentWriteKey = window.__env.segmentWriteKey;
  window.EmberENV.intercomAppId = window.__env.intercomAppId;
}

loadInitializers(App, config.modulePrefix);

export default App;
