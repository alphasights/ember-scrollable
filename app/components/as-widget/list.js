import Ember from 'ember';
import WidgetComponent from 'phoenix/components/as-widget/widget';

export default WidgetComponent.extend({
  classNameBindings: [':list', 'isCollapsed:collapsed'],

  model: null,
  teamMembers: null,
  isTeamView: null,

  widgetTemplateName: 'components/as-widget/-list',
  headerTemplateName: 'components/as-widget/-list-header',
  listItemTemplateName: null,
  isCollapsed: true,
  collapsedMaxVisibleItems: 4,
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

  _paginationInfo: Ember.computed('visibleContent.length', 'arrangedContent.length', function() {
    return `${this.get('visibleContent.length')} of ${this.get('arrangedContent.length')}`;
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
