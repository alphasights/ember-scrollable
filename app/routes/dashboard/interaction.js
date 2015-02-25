import SidePanelRoute from 'phoenix/routes/side-panel';

export default SidePanelRoute.extend({
  viewName: 'dashboard.interaction',
  sidePanelActionsTemplateName: 'side-panel/navigation-actions',

  model: function(params) {
    return this.store.find('interaction', params.interaction_id);
  }
});
