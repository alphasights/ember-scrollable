import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('dashboard', { path: '/' });
  this.resource('performance');
  this.resource('projects');

  this.resource('team', { path: 'teams/:team_id' }, function() {
    this.resource('team.project', { path: ':project_id' });
  });

  this.route('application_error', { path: '*path' });
});

export default Router;
