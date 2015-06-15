import Ember from 'ember';
import TeamSwitcheableRouteMixin from 'phoenix/mixins/team-switcheable-route';

export default Ember.Route.extend(TeamSwitcheableRouteMixin, {
  currentUser: Ember.inject.service(),
  titleToken: 'Projects',

  model: function(params) {
    var teamId = params.teamId;
    var projects;
    var teamMembers;

    if (teamId != null) {
      projects = this.store.find('project', { team_id: teamId, all_time: true });
      teamMembers = this.store.find('user', { team_id: teamId });
    } else {
      projects = this.store.find('project', { user_id: this.get('currentUser.id'), all_time: true });
    }

    return Ember.RSVP.hash({
      projects: projects,
      teamMembers: teamMembers
    });
  },

  setupController: function(controller, models) {
    controller.set('model', models.projects);
    controller.set('teamMembers', models.teamMembers);
  }
});
