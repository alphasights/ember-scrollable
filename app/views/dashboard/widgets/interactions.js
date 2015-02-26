import WidgetView from '../widget';

export default WidgetView.extend({
  templateName: 'dashboard/widgets/interactions',
  classNameBindings: [':interactions'],
  listItemTemplateName: null
});
