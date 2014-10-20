import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['currentUser'],
  teamMemberId: Ember.computed.alias('controllers.currentUser.teamMemberId'),
  teamMemberSorting: ['initials'],

  sortedTeams: (function() {
    return this.get('model').sortBy('office');
  }).property('model'),

  sortedTeamMembers: (function() {
    var users = this.get('selectedTeam.users');

    if (users != null) {
      return users.sortBy('initials');
    } else {
      return [];
    }
  }).property('selectedTeam.users'),

  selectedTeam: null,

  selectedTeamMember: (function() {
    var teamMemberId = this.get('teamMemberId');
    var selectedTeamMembers = this.get('selectedTeam.users');

    if (selectedTeamMembers != null && teamMemberId != null) {
      return selectedTeamMembers.findBy('initials', teamMemberId);
    } else {
      return null;
    }
  }).property('teamMemberId', 'selectedTeam'),

  selectedTeamDidChange: function() {
    return this.get('controller').transitionToRoute('team', this.get('selection.id'), {
      queryParams: {
        teamMemberId: undefined
      }
    });
  }
});
