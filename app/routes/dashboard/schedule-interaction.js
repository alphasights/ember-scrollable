import Ember from 'ember';
import SidePanelRouteMixin from 'phoenix/mixins/side-panel-route';

export default Ember.Route.extend(SidePanelRouteMixin, {
  model: function(params) {
    return Ember.RSVP.hash({
      interaction: this.store.find('interaction', params.interaction_id),
      unavailabilities: this.store.find('unavailability', {
        interaction_id: params.interaction_id
      })
    });
  },

  setupController: function(controller, model) {
    controller.set('model', model.interaction);
    controller.set('unavailabilities', model.unavailabilities);
  }
});
