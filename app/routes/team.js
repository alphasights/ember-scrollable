import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      users: this.store.find('user', {
        team_id: params.team_id
      }),

      projects: this.store.find('project', {
        team_id: params.team_id
      }),
      
      team: this.store.find('team', params.team_id)
    });
  },

  setupController: function(controller, models) {
    this.controllerFor('teams').set('selectedTeam', models.team);
    controller.set('model', models.team);
    controller.set('projects', models.projects);
    controller.set('users', models.users);
  }
});
