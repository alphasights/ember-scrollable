import SidePanelRoute from 'phoenix/routes/side-panel';

export default SidePanelRoute.extend({
  viewName: 'dashboard.interaction',
  sidePanelActionsTemplateName: 'dashboard/interaction-side-panel-actions',

  model: function(params) {
    var interactionId = params.interaction_id;

    return this.store.find('interaction').then(() => {
      return this.store.find('interaction', interactionId);
    });
  }
});
