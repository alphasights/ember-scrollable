import Ember from 'ember';
import SidePanelRouteMixin from 'phoenix/mixins/side-panel-route';
import { request } from 'ic-ajax';

export default Ember.Route.extend(SidePanelRouteMixin, {
  model: function(params) {
    return Ember.RSVP.hash({
      interaction: this.store.find('interaction', params.interaction_id),
      unavailabilities: this.store.find('unavailability', {
        interaction_id: params.interaction_id
      }),
      interactionTypesResponse: request(`${EmberENV.apiBaseUrl}/interaction_types`, {
        }).then(response => {
          return response.interaction_types;
      })
    });
  },

  setupController: function(controller, model) {
    controller.set('model', model.interaction);
    controller.set('unavailabilities', model.unavailabilities);
    controller.set(
      'interactionTypes', model.interactionTypesResponse.interaction_types
    );
    controller.set(
      'interactionClassifications', model.interactionTypesResponse.classifications
    );
  }
});
