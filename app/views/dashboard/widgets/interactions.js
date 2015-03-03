import WidgetView from '../widget';
import Ember from 'ember';

export default WidgetView.extend({
  templateName: 'dashboard/widgets/interactions',
  classNameBindings: [':interactions', 'isCollapsed:collapsed'],

  listItemTemplateName: null,
  hasMoreItems: Ember.computed.oneWay('controller.hasMoreItems'),
  isCollapsed: Ember.computed.oneWay('controller.isCollapsed'),
  paginationInfo: Ember.computed.oneWay('controller.paginationInfo'),
  
  title: function() {
    if (this.get('hasMoreItems')) {
      return `${this.get('name')} (${this.get('paginationInfo')})`;
    } else {
      return this.get('name');
    }
  }.property('name', 'hasMoreItems', 'paginationInfo')
});
