import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: 'dashboard',
  dashboard: Ember.computed.oneWay('controllers.dashboard'),
  isTeamView: Ember.computed.oneWay('dashboard.isTeamView'),
  isCollapsed: true,
  collapsedMaxVisibleItems: 4,
  teamMembers: Ember.computed.oneWay('dashboard.teamMembers'),
  selectedTeamMember: null,

  visibleContent: Ember.computed('arrangedContent.[]', 'isCollapsed', function() {
    var arrangedContent = this.get('arrangedContent');

    if (this.get('isCollapsed')) {
      return arrangedContent.slice(0, this.get('collapsedMaxVisibleItems'));
    } else {
      return arrangedContent;
    }
  }),

  hasMoreItems: Ember.computed('collapsedMaxVisibleItems', 'arrangedContent.length', function() {
    return this.get('arrangedContent.length') > this.get('collapsedMaxVisibleItems');
  }),

  collapseTitle: Ember.computed('isCollapsed', function() {
    if (this.get('isCollapsed')) {
      return 'Show More';
    } else {
      return 'Collapse';
    }
  }),

  paginationInfo: Ember.computed('visibleContent.length', 'length', function() {
    return `${this.get('visibleContent.length')} of ${this.get('length')}`;
  }),

  arrangedContent: Ember.computed('model', 'selectedTeamMember', function() {
    var selectedTeamMember = this.get('selectedTeamMember');

    if (selectedTeamMember) {
      return this.get('model').filterBy('primaryContact', selectedTeamMember);
    } else {
      return this.get('model');
    }
  }),

  actions: {
    toggleCollapse: function() {
      this.toggleProperty('isCollapsed');
    },

    setTeamMember: function(teamMember) {
      this.set('selectedTeamMember', teamMember);
    }
  }
});
