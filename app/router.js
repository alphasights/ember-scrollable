import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('dashboard');
  this.resource('performance');
  this.resource('projects');

  this.resource('teams', function() {
    this.resource('teams.team', { path: '/:team_id/projects' }, function() {
      this.resource('teams.team.project', { path: '/:project_id' });
    });
  });

  this.route('application_error', { path: '*path' });
});

export default Router;
