import SidePanelRoute from 'phoenix/routes/side-panel';

export default SidePanelRoute.extend({
  viewName: 'teams.team.project',
  sidePanelActionsTemplateName: 'teams/team/project-side-panel-actions',

  setupController: function(controller, model) {
    this._super(controller, model);

    var projects = this.controllerFor('teams.team').get('projects.arrangedContent');
    this.set('index', projects.indexOf(model));
  },

  navigate: function(step) {
    var projects = this.controllerFor('teams.team').get('projects.arrangedContent');
    var team = this.controllerFor('teams.team').get('model');
    var newProjectIndex = this.get('index') + step;

    if (newProjectIndex < 0) {
      newProjectIndex = projects.length + newProjectIndex;
    }

    var newProject = projects.objectAt(newProjectIndex % projects.length);

    this.set('index', newProjectIndex);
    this.transitionTo('teams.team.project', team.get('id'), newProject.get('id'));
  },

  actions: {
    hideSidePanel: function() {
      this.transitionTo('teams.team', this.controllerFor('teams.team').get('id'));
    },

    previous: function() {
      this.navigate(-1);
    },

    next: function() {
      this.navigate(1);
    }
  }
});
