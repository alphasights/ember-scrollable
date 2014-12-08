import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var teamId = this.controllerFor('currentUser').get('teamId');

    return Ember.RSVP.hash({
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
    this.controllerFor('team/projects').set('model', models.projects)
  }
});
