import WidgetView from '../widget';
import Ember from 'ember';

export default WidgetView.extend({
  templateName: 'dashboard/widgets/interactions',
  classNameBindings: [':interactions', 'isCollapsed:collapsed'],

  isCollapsed: Ember.computed.oneWay('controller.isCollapsed'),
  listItemTemplateName: null,

  title: function() {
    if (Ember.isPresent(this.get('controller.visibleContent'))) {
      return `${this.get('name')} (${this.get('controller.visibleContent.length')} of ${this.get('controller.length')})`;
    } else {
      return this.get('name');
    }
  }.property('name', 'visibleContent.length', 'length')
});
