import SidePanelRoute from '../side-panel';

export default SidePanelRoute.extend({
  viewName: 'team/project',
  sidePanelActionsTemplateName: 'team/project-side-panel-actions',

  actions: {
    hideSidePanel: function() {
      this.transitionTo('team');
    },

    goToPreviousProject: function(project) {
      var projects = this.controllerFor('team/projects').get('arrangedContent');
      var currentProjectIndex = projects.indexOf(project);
      var previousProjectIndex = currentProjectIndex - 1;

      if (previousProjectIndex < 0) {
        previousProjectIndex = projects.length - previousProjectIndex
      }

      this.transitionTo('team.project', projects[previousProjectIndex]);
    },

    goToNextProject: function(project) {
      var projects = this.controllerFor('team/projects').get('arrangedContent');
      var currentProjectIndex = projects.indexOf(project);

      this.transitionTo('team.project', projects[Math.abs(currentProjectIndex + 1) % projects.length]);
    }
  }
});
