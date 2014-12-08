import SidePanelRoute from '../side-panel';

export default SidePanelRoute.extend({
  viewName: 'team/project',
  sidePanelActionsTemplateName: 'team/project-side-panel-actions',

  actions: {
    hideSidePanel: function() {
      this.transitionTo('team');
    }
  }
});
