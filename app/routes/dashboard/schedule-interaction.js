import Ember from 'ember';
import SidePanelRouteMixin from 'ember-cli-paint/mixins/side-panel-route';
import { request } from 'ic-ajax';

export default Ember.Route.extend(SidePanelRouteMixin, {
  titleToken: 'Scheduling',

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

  setupController: function(controller, models) {
    models.interaction.initialize();

    controller.setProperties({
      model: models.interaction,
      unavailabilities: models.unavailabilities,
      interactionTypes: models.interactionTypes.interaction_types,
      interactionClassifications: models.interactionTypes.classifications,
      speakDialInCountries: models.speakDialInCountries.dial_ins,

      // reset form fields
      scheduledCallTime: models.interaction.get('scheduledCallTime'),
      interactionType: models.interaction.get('interactionType'),
      advisorPhoneNumber: models.interaction.get('advisorPhoneNumber'),
      advisorPhoneCountryCode: models.interaction.get('advisorPhoneCountryCode'),
      clientAccessNumberCountry: models.interaction.get('clientAccessNumberCountry'),
      additionalContactDetails: models.interaction.get('additionalContactDetails'),
    });
  }
});
