import Ember from 'ember';
import SidePanelRouteMixin from 'ember-cli-paint/mixins/side-panel-route';

export default Ember.Route.extend(SidePanelRouteMixin, {
  model: function(params) {
    return Ember.RSVP.hash({
      unusedAdvisor: this.store.find('unusedAdvisor', params.unused_advisor_id),
      projectHistory: this.store.find('projectHistory')
    });
  },

  setupController: function(controller, models) {
    controller.set('model', models.unusedAdvisor);
    controller.set('projectHistory', models.projectHistory);
  }
});
