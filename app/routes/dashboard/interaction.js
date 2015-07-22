import Ember from 'ember';
import SidePanelRouteMixin from 'ember-cli-paint/mixins/side-panel-route';
import AdvisorPaymentForm from 'phoenix/forms/advisor-payment-form';
import InteractionCompletionForm from 'phoenix/forms/interaction-completion-form';
import { request } from 'ic-ajax';

export default Ember.Route.extend(SidePanelRouteMixin, {
  titleToken: function(models) {
    let advisorName = models.interaction.get('advisor.name');

    return `Interaction: ${advisorName}`;
  },

  model: function(params) {
    return this.store.findRecord('interaction', params.interaction_id).then((interaction) => {
      let validCompletion = interaction.get('validInteractionCompletion');
      let completion;

      if (validCompletion) {
        completion = validCompletion;
      } else {
        completion = this.store.createRecord('interactionCompletion', {
          interaction: interaction
        });
      }

      return Ember.RSVP.hash({
        interaction: interaction,
        interactionTypes: request(`${EmberENV.apiBaseUrl}/interaction_types`),
        completion: completion
      });
    });
  },

  setupController: function(controller, models) {
    controller.setProperties({
      model: models.interaction,

      completionForm: InteractionCompletionForm.create({
        model: models.completion,
        interactionTypes: models.interactionTypes.interaction_types,
        interactionClassifications: models.interactionTypes.classifications,
        container: this.get('container')
      }),

      advisorPaymentForm: AdvisorPaymentForm.create({
        model: models.interaction,
        container: this.get('container')
      }),

      showForm: false
    });
  }
});
