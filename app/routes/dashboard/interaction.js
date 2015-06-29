import Ember from 'ember';
import SidePanelRouteMixin from 'ember-cli-paint/mixins/side-panel-route';
import InteractionCompletionForm from 'phoenix/forms/interaction-completion-form';

export default Ember.Route.extend(SidePanelRouteMixin, {
  titleToken: function(models) {
    let advisorName = models.interaction.get('advisor.name');

    return `Interaction: ${advisorName}`;
  },

  model: function(params) {
    return this.store.find('interaction', params.interaction_id).then((interaction) => {
      return Ember.RSVP.hash({
        interaction: interaction,

        completion: this.store.createRecord('interactionCompletion', {
          interaction: interaction
        })
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

      showForm: false
    });
  }
});
