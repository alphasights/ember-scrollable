import WidgetView from '../widget';
import Ember from 'ember';

export default WidgetView.extend({
  classNameBindings: [':unused-advisors'],

  name: 'Unused Advisors',
  listItemTemplateName: 'dashboard/widgets/unused-advisors/list-item',
  emptyMessage: 'There are no unused advisors to contact.',
  hasMoreItems: Ember.computed.oneWay('controller.hasMoreItems'),
  isCollapsed: Ember.computed.oneWay('controller.isCollapsed'),
  paginationInfo: Ember.computed.oneWay('controller.paginationInfo'),

  title: Ember.computed('name', 'hasMoreItems', 'paginationInfo', function() {
    if (this.get('hasMoreItems')) {
      return `${this.get('name')} (${this.get('paginationInfo')})`;
    } else {
      return this.get('name');
    }
  })
});
