import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import localMoment from 'phoenix/helpers/local-moment';
import timeZoneAbbreviation from 'phoenix/helpers/time-zone-abbreviation';

Ember.Handlebars.registerBoundHelper('local-moment', localMoment);
Ember.Handlebars.registerBoundHelper('time-zone-abbreviation', timeZoneAbbreviation);

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

if (typeof __env !== 'undefined' && __env != null) {
  _(EmberENV).extend(__env);
}

loadInitializers(App, config.modulePrefix);

export default App;
