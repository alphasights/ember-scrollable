import SidePanelRoute from 'phoenix/routes/side-panel';

export default SidePanelRoute.extend({
  model: function(params) {
    var interactionId = params.interaction_id;

    return this.store.find('interaction', interactionId);
  }
});
