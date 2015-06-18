import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: function(models) {
    let whiteboardName = models.whiteboard.get('name');

    return `Whiteboard: ${whiteboardName}`;
  },

  model: function(params) {
    var whiteboardId = params.whiteboard_id;
    var whiteboard, queryParams;

    if (params.whiteboard_id.lastIndexOf('team-', 0) === 0) {
      var teamId = whiteboardId.replace('team-', '');

      whiteboard = this.store.find('team', teamId).then(function(value) {
        return value.get('defaultWhiteboard');
      });

      queryParams = {
        team_id: teamId
      };
    } else {
      whiteboard = this.store.find('whiteboard', whiteboardId);

      queryParams = {
        whiteboard_id: whiteboardId
      };
    }

    return Ember.RSVP.hash({
      whiteboard: whiteboard,
      members: this.store.find('user', queryParams),
      projects: this.store.find('project', queryParams)
    });
  },

  setupController: function(controller, models) {
    controller.set('model', models.whiteboard);
    controller.set('projects', models.projects);
    controller.set('members', models.members);
    this.controllerFor('whiteboards').set('selectedWhiteboard', models.whiteboard);
  }
});
