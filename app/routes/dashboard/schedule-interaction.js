import Ember from 'ember';
import SidePanelRouteMixin from 'ember-cli-paint/mixins/side-panel-route';
import ScheduleInteractionForm from 'phoenix/forms/schedule-interaction-form';
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
    controller.setProperties({
      model: models.interaction,
      unavailabilities: models.unavailabilities,

      scheduleInteractionForm: ScheduleInteractionForm.create({
        model: models.interaction,
        interactionTypes: models.interactionTypes.interaction_types,
        interactionClassifications: models.interactionTypes.classifications,
        speakDialInCountries: models.speakDialInCountries.dial_ins,
        container: this.get('container')
      })
    });
  }
});
