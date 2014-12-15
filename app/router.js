import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('team', function() {
    this.resource('team.project', { path: ':project_id' });
  });

  this.resource('dashboard');
  this.resource('projects');
  this.resource('performances');

  this.route('application_error', { path: '*path' });
});

export default Router;
