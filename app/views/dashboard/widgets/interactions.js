import WidgetView from '../widget';
import Ember from 'ember';

export default WidgetView.extend({
  templateName: 'dashboard/widgets/interactions',
  classNameBindings: [':interactions', 'isCollapsed:collapsed'],

  isCollapsed: Ember.computed.oneWay('controller.isCollapsed'),
  listItemTemplateName: null,

  title: function() {
    var visibleContent = this.get('controller.visibleContent');

    if (Ember.isPresent(visibleContent)) {
      return `${this.get('name')} (${visibleContent.get('length')} of ${this.get('controller.length')})`;
    } else {
      return this.get('name');
    }
  }.property('name', 'visibleContent.length', 'controller.length')
});
