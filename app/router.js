import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('teams', function() {
    this.resource('team', { path: ':team_id' });
  });

  this.resource('dashboard');
  this.resource('projects');
  this.resource('performances');
});

export default Router;
