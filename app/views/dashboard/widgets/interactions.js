import WidgetView from '../widget';

export default WidgetView.extend({
  templateName: 'dashboard/widgets/interactions',
  classNameBindings: [':interactions', 'isCollapsed:collapsed'],

  isCollapsed: Ember.computed.oneWay('controller.isCollapsed'),
  listItemTemplateName: null
});
