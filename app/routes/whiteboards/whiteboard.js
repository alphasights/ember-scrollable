import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var whiteboardId = params.whiteboard_id;

    return Ember.RSVP.hash({
      whiteboard: this.store.find('whiteboard', whiteboardId),

      members: this.store.find('user', {
        whiteboard_id: whiteboardId
      }),

      projects: this.store.find('project', {
        whiteboard_id: whiteboardId
      })
    });
  },

  setupController: function(controller, models) {
    controller.set('model', models.whiteboard);
    controller.set('projects.model', models.projects);
    controller.set('members', models.members);
    this.controllerFor('whiteboards').set('selectedTeam', models.team);
  }
});
