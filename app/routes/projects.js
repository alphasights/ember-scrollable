import Ember from 'ember';
import TeamSwitcheableRouteMixin from 'phoenix/mixins/team-switcheable-route';

export default Ember.Route.extend(TeamSwitcheableRouteMixin, {
  model: function(params) {
    var currentUser = this.controllerFor('currentUser');
    var teamId = params.teamId;
    var projects;

    if (teamId != null) {
      projects = this.store.find('project', { team_id: teamId, all_time: true });
    } else {
      projects = this.store.find('project', { user_id: currentUser.get('model.id'), all_time: true });
    }

    return Ember.RSVP.hash({
      projects: projects
    });
  },

  setupController: function(controller, models) {
    controller.set('model', models.projects);
  }
});
