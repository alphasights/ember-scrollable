import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var teamId = this.controllerFor('currentUser').get('teamId');

    return Ember.RSVP.hash({
      users: this.store.find('user', {
        team_id: teamId
      }),

      projects: this.store.find('project', {
        team_id: teamId
      }),

      team: this.store.find('team').then((teams) => {
        return this.store.find('team', teamId);
      })
    });
  },

  setupController: function(controller, models) {
    controller.set('model', models.team);
    controller.set('projects', models.projects);
    controller.set('users', models.users);
  }
});
