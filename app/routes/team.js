import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var teamId = params.team_id;

    return Ember.RSVP.hash({
      members: this.store.find('user', {
        team_id: teamId
      }),

      teamId: teamId,

      projects: this.store.find('project', {
        team_id: teamId
      }),

      teams: this.store.find('team')
    });
  },

  setupController: function(controller, models) {
    var team = models.teams.findBy('id', models.teamId);
    controller.set('model', team);
    controller.set('projects', models.projects);
    controller.set('members', models.members);
    controller.set('teams', models.teams);
    controller.set('selectedTeam', team);
    this.controllerFor('team.projects').set('model', models.projects);
  }
});
