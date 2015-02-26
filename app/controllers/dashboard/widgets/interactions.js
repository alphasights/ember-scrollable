import Ember from 'ember';

export default Ember.ArrayController.extend({
  isCollapsed: true,
  collapsedMaxVisibleItems: 4,

  visibleContent: function() {
    var arrangedContent = this.get('arrangedContent');

    if (this.get('isCollapsed')) {
      return arrangedContent.slice(0, this.get('collapsedMaxVisibleItems'));
    } else {
      return arrangedContent;
    }
  }.property('arrangedContent.[]', 'isCollapsed'),

  hasMoreItems: function() {
    return this.get('arrangedContent.length') >= this.get('collapsedMaxVisibleItems');
  }.property('collapsedMaxVisibleItems', 'arrangedContent.length'),

  collapseTitle: function() {
    if (this.get('isCollapsed')) {
      return 'Show Less';
    } else {
      return 'Show More';
    }
  }.property('isCollapsed'),

  actions: {
    toggleCollapse: function() {
      this.toggleProperty('isCollapsed');
    }
  }
});
