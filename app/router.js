import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('dashboard', { path: '/' });
  this.resource('projects');
  this.resource('performance');

  this.resource('team', function() {
    this.resource('team.project', { path: ':project_id' });
  });
});

export default Router;
