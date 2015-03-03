import WidgetView from '../widget';
import Ember from 'ember';

export default WidgetView.extend({
  templateName: 'dashboard/widgets/interactions',
  classNameBindings: [':interactions', 'isCollapsed:collapsed'],

  listItemTemplateName: null,
  content: Ember.computed.oneWay('controller.content'),
  hasMoreItems: Ember.computed.oneWay('controller.hasMoreItems'),
  isCollapsed: Ember.computed.oneWay('controller.isCollapsed'),
  visibleContent: Ember.computed.oneWay('controller.visibleContent'),

  paginationInfo: function() {
    return `(${this.get('visibleContent.length')} of ${this.get('content.length')})`;
  }.property('visibleContent.length', 'content.length'),

  title: function() {
    if (this.get('hasMoreItems')) {
      return `${this.get('name')} ${this.get('paginationInfo')}`;
    } else {
      return this.get('name');
    }
  }.property('name', 'hasMoreItems', 'paginationInfo')
});
