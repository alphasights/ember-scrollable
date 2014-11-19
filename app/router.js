import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('team');
  this.resource('dashboard');
  this.resource('projects');
  this.resource('performances');
});

export default Router;
