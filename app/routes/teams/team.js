import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var teamId = params.team_id;

    return Ember.RSVP.hash({
      team: this.store.find('team', teamId),

      members: this.store.find('user', {
        team_id: teamId
      }),

      projects: this.store.find('project', {
        team_id: teamId
      })
    });
  },

  setupController: function(controller, models) {
    controller.set('model', models.team);
    controller.set('projects.model', models.projects);
    controller.set('members', models.members);
    this.controllerFor('teams').set('selectedTeam', models.team);
  }
});
