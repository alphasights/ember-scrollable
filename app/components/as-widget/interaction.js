import Ember from 'ember';
import WidgetComponent from 'phoenix/components/as-widget/widget';

export default WidgetComponent.extend({
  headerTemplateName: 'components/as-widget/interaction-header',
  model: null,

  dashboard: Ember.computed.oneWay('controllers.dashboard'),

  classNameBindings: [':interactions', 'isCollapsed:collapsed'],
  isTeamView: Ember.computed.oneWay('dashboard.isTeamView'),
  listItemTemplateName: null,
  isCollapsed: true,
  collapsedMaxVisibleItems: 4,
  teamMembers: Ember.computed.oneWay('dashboard.teamMembers'),
  selectedTeamMember: null,

  title: Ember.computed('name', 'hasMoreItems', '_paginationInfo', function() {
    if (this.get('hasMoreItems')) {
      return `${this.get('name')} (${this.get('_paginationInfo')})`;
    } else {
      return this.get('name');
    }
  }),

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

  arrangedContent: Ember.computed('model', 'selectedTeamMember', function() {
    var selectedTeamMember = this.get('selectedTeamMember');

    if (selectedTeamMember) {
      return this.get('model').filterBy('primaryContact', selectedTeamMember);
    } else {
      return this.get('model');
    }
  }),

  _paginationInfo: Ember.computed('visibleContent.length', 'model.length', function() {
    return `${this.get('visibleContent.length')} of ${this.get('model.length')}`;
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
