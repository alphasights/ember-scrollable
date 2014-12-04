import SidePanelRoute from '../side-panel';

export default SidePanelRoute.extend({
  sidePanelActionsTemplateName: 'team/project-side-panel-actions',

  actions: {
    hideSidePanel: function() {
      this.transitionTo('team');
    }
  }
});
