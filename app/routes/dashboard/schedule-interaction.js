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
    var interactionType = model.interaction.get('interactionType');

    if (Ember.isBlank(interactionType)) {
      interactionType = model.interaction.get('project.defaultInteractionType');
    }

    controller.setProperties({
      model: model.interaction,
      unavailabilities: model.unavailabilities,
      interactionTypes: model.interactionTypes.interaction_types,
      interactionClassifications: model.interactionTypes.classifications,
      speakDialInCountries: model.speakDialInCountries.dial_ins,

      // reset form fields
      scheduledCallTime: model.interaction.get('scheduledCallTime'),
      interactionType: interactionType,
      advisorPhoneNumber: model.interaction.get('advisorPhoneNumber'),
      advisorPhoneCountryCode: model.interaction.get('advisorPhoneCountryCode'),
      clientAccessNumberCountry: model.interaction.get('clientAccessNumberCountry'),
      additionalContactDetails: model.interaction.get('additionalContactDetails'),
    });
  }
});
