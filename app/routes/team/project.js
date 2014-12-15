import SidePanelRoute from '../side-panel';

export default SidePanelRoute.extend({
  viewName: 'team.project',
  sidePanelActionsTemplateName: 'team/project-side-panel-actions',

  setupController: function(controller, model) {
    this._super(controller, model);

    var projects = this.controllerFor('team.projects').get('arrangedContent');
    this.set('index', projects.indexOf(model));
  },

  navigate: function(step) {
    var projects = this.controllerFor('team.projects').get('arrangedContent');
    var newProjectIndex = this.get('index') + step;

    if (newProjectIndex < 0) {
      newProjectIndex = projects.length + newProjectIndex;
    }

    this.set('index', newProjectIndex);
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
