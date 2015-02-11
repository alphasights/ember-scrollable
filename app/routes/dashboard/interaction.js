import Ember from 'ember';
import SidePanelRoute from 'phoenix/routes/side-panel';

export default SidePanelRoute.extend({
  viewName: 'dashboard.interaction',
  sidePanelActionsTemplateName: 'dashboard/interaction-side-panel-actions',

  model: function(params) {
    var interactionId = params.interaction_id;

    return Ember.RSVP.hash({
      interaction: this.store.find('interaction').then(() => {
        return this.store.find('interaction', interactionId);
      }),

      checklistItems: this.store.find('checklistItem')
    });
  },

  setupController: function(controller, models) {
    controller.set('model', models.interaction);
    controller.set('checklistItems', models.checklistItems);
  },

  actions: {
    hideSidePanel: function() {
      this.transitionTo('dashboard');
    }
  }
});
