import WidgetView from '../widget';
import Ember from 'ember';

export default WidgetView.extend({
  templateName: 'dashboard/widgets/interactions',
  classNameBindings: [':interactions', 'isCollapsed:collapsed'],

  isCollapsed: Ember.computed.oneWay('controller.isCollapsed'),
  listItemTemplateName: null
});
