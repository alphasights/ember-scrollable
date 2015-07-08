import Ember from 'ember';
import SidePanelRouteMixin from 'ember-cli-paint/mixins/side-panel-route';
import AdvisorPaymentForm from 'phoenix/forms/advisor-payment-form';
import InteractionCompletionForm from 'phoenix/forms/interaction-completion-form';

export default Ember.Route.extend(SidePanelRouteMixin, {
  titleToken: function(models) {
    let advisorName = models.interaction.get('advisor.name');

    return `Interaction: ${advisorName}`;
  },

  model: function(params) {
    return this.store.find('interaction', params.interaction_id).then((interaction) => {
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
        completion: completion
      });
    });
  },

  setupController: function(controller, models) {
    controller.setProperties({
      model: models.interaction,

      completionForm: InteractionCompletionForm.create({
        model: models.completion,
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
