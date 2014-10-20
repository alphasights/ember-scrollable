import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['team'],
  allTeamMembers: Ember.computed.alias('controllers.team.users'),
  hasUsers: Ember.computed.gt('users.length', 0),
  sortedAngleTeamMemberships: Ember.computed.sort('angleTeamMemberships', 'teamMembershipsSortProperties'),
  teamMembershipsSortProperties: ['createdAt'],
  query: null,

  shownUsers: (function() {
    if (this.get('query')) {
      return this.get('searchResults');
    } else {
      return this.get('users');
    }
  }).property('users', 'searchResults', 'query'),

  users: (function() {
    return _(this.get('allTeamMembers').toArray()).difference(this.get('teamMembers'));
  }).property('allTeamMembers.[]', 'teamMembers.[]'),

  queryDidChange: (function() {
    if (this.get('query.length') > 1) {
      Ember.run.debounce(this, 'search', 500);
    }
  }).observes('query'),

  search: function() {
    this.set('searchResults', this.store.find('user', {
      query: this.get('query')
    }));
  },
  actions: {
    addAngleTeamMembership: function(user) {
      var angleTeamMembership = this.store.createRecord('angleTeamMembership', {
        teamMember: user,
        angle: this.get('content'),
        project: this.get('project')
      });

      this.saveWithErrors(angleTeamMembership);
      this.get('angleTeamMemberships').pushObject(angleTeamMembership);
    },

    clearSearch: function() {
      this.set('query', null);
    }
  }
});
