import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('dashboard', function() {
    this.resource('dashboard.interaction', { path: '/interactions/:interaction_id' });
    this.resource('dashboard.schedule-interaction', { path: '/interactions/:interaction_id/schedule' });
    this.resource('dashboard.unused-advisor', { path: '/unused_advisors/:unused_advisor_id' });
  });

  this.resource('labs');
  this.resource('performance');
  this.resource('projects');

  this.resource('whiteboards', function() {
    this.resource('whiteboards.whiteboard', { path: '/:whiteboard_id/projects' }, function() {
      this.resource('whiteboards.whiteboard.project', { path: '/:project_id' });
    });
  });

  this.route('application_error', { path: '*path' });
});

export default Router;
