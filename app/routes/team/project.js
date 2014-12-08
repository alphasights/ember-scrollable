import SidePanelRoute from '../side-panel';

export default SidePanelRoute.extend({
  viewName: 'team.project',
  sidePanelActionsTemplateName: 'team/project-side-panel-actions',

  navigate: function(step) {
    var projects = this.controllerFor('team.projects').get('arrangedContent');
    var project = this.controllerFor('team.project').get('model');
    var newProjectIndex = projects.indexOf(project) + step;

    if (newProjectIndex < 0) {
      newProjectIndex = projects.length + newProjectIndex;
    }

    this.transitionTo('team.project', projects.objectAt(newProjectIndex % projects.length));
  },

  actions: {
    hideSidePanel: function() {
      this.transitionTo('team');
    },

    previous: function() {
      this.navigate(-1);
    },

    next: function() {
      this.navigate(1);
    }
  }
});
