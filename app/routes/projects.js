import Ember from 'ember';
import TeamSwitcheableRouteMixin from 'phoenix/mixins/team-switcheable-route';

export default Ember.Route.extend(TeamSwitcheableRouteMixin, {
  currentUser: Ember.inject.service(),
  titleToken: 'Projects',

  model: function(params) {
    var teamId = params.teamId;
    var projects;

    if (teamId != null) {
      projects = this.store.find('project', { team_id: teamId, all_time: true });
    } else {
      projects = this.store.find('project', { user_id: this.get('currentUser.id'), all_time: true });
    }

    return Ember.RSVP.hash({
      projects: projects
    });
  },

  setupController: function(controller, models) {
    controller.set('model', models.projects);
  }
});
