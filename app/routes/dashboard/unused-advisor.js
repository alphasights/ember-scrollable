import Ember from 'ember';
import SidePanelRouteMixin from 'ember-cli-paint/mixins/side-panel-route';

export default Ember.Route.extend(SidePanelRouteMixin, {
  model: function(params) {
    return this.store.find('unusedAdvisor', params.unused_advisor_id).then((unusedAdvisor) => {
      return Ember.RSVP.hash({
        unusedAdvisor: unusedAdvisor,
        projectHistory: this.store.find('projectHistory', { advisor_id: unusedAdvisor.get('advisor.id') })
      });
    })
  },

  setupController: function(controller, models) {
    controller.set('model', models.unusedAdvisor);
    controller.set('projectHistory', models.projectHistory);
  }
});
