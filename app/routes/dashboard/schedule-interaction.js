import Ember from 'ember';
import SidePanelRouteMixin from 'ember-cli-paint/mixins/side-panel-route';
import { request } from 'ic-ajax';

export default Ember.Route.extend(SidePanelRouteMixin, {
  model: function(params) {
    return Ember.RSVP.hash({
      interaction: this.store.find('interaction', params.interaction_id),
      unavailabilities: this.store.find('unavailability', {
        interaction_id: params.interaction_id
      }),
      interactionTypes: request(`${EmberENV.apiBaseUrl}/interaction_types`),
      speakDialInCountries: request(`${EmberENV.apiBaseUrl}/dial_ins`)
    });
  },

  setupController: function(controller, model) {
    controller.set('model', model.interaction);
    controller.set('unavailabilities', model.unavailabilities);
    controller.set(
      'interactionTypes', model.interactionTypes.interaction_types
    );
    controller.set(
      'interactionClassifications', model.interactionTypes.classifications
    );
    controller.set('speakDialInCountries', model.speakDialInCountries.dial_ins);
  }
});
