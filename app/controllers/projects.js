import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['teams', 'stats'],
  teams: Ember.computed.alias('controllers.teams'),
  stats: Ember.computed.alias('controllers.stats'),

  sortedProjects: (function() {
    return this.get('filteredProjects');
  }).property('filteredProjects'),

  filteredProjects: (function() {
    var selectedTeamMember = this.get('teams.selectedTeamMember');

    if (selectedTeamMember != null) {
      return this.get('model').filter(function(project) {
        return project.get('teamMembers').concat(project.get('analyst_1')).isAny('id', selectedTeamMember.get('id'));
      });
    } else {
      return this.get('model');
    }
  }).property('teams.selectedTeamMember.id', 'model'),

  filteredProjectsDidChange: (function() {
    this.set('stats.projects', this.get('filteredProjects').toArray());
  }).observes('filteredProjects').on('init')
});
