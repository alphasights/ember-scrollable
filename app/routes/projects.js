import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var currentUser = this.controllerFor('currentUser');

    return Ember.RSVP.hash({
      projects: this.store.find('project', { user_id: currentUser.get('model.id') })
    });
  },

  setupController: function(controller, models) {
    controller.set('model', models.projects);
  }
});
