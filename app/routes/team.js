import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var teamId = this.controllerFor('currentUser').get('teamId');

    return Ember.RSVP.hash({
      members: this.store.find('user', {
        team_id: teamId
      }),

      projects: this.store.find('project', {
        team_id: teamId
      }),

      team: this.store.find('team').then(() => {
        return this.store.find('team', teamId);
      })
    });
  },

  setupController: function(controller, models) {
    controller.set('model', models.team);
    controller.set('projects', models.projects);
    controller.set('members', models.members);
    this.controllerFor('team.projects').set('model', models.projects);
  }
});
