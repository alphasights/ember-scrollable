import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    scope: {
      refreshModel: true
    }
  },

  model: function(params) {
    var currentUser = this.controllerFor('currentUser');
    var scope = params.scope;
    var projects;

    if (scope === 'team') {
      projects = this.store.find('project', { all_time: true });
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
