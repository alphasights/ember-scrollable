import SidePanelRoute from '../side-panel';

export default SidePanelRoute.extend({
  actions: {
    hideSidePanel: function() {
      this.transitionTo('team');
    }
  }
});
