import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Whiteboard',

  model: function(params) {
    var whiteboardId = params.whiteboard_id;
    var queryParams, teamId;

    if (params.whiteboard_id.lastIndexOf('team-', 0) === 0) {
      teamId = whiteboardId.replace('team-', '');

      queryParams = {
        team_id: teamId
      };
    } else {
      queryParams = {
        whiteboard_id: whiteboardId
      };
    }

    return Ember.RSVP.hash({
      teamId: teamId,
      whiteboardId: whiteboardId,
      members: this.store.query('user', queryParams),
      projects: this.store.query('project', queryParams)
    });
  },

  setupController: function(controller, models) {
    controller.set('projects', models.projects);
    controller.set('members', models.members);
    controller.set('whiteboardId', models.whiteboardId);
    controller.set('teamId', models.teamId);
    this.controllerFor('whiteboards').set('teamId', models.teamId);
    this.controllerFor('whiteboards').set('whiteboardId', models.whiteboardId);
  }
});
