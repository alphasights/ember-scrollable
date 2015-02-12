import WidgetView from '../widget';

export default WidgetView.extend({
  classNameBindings: [':upcoming-interactions'],
  name: 'Upcoming Interactions',
  headerTemplateName: 'dashboard/widgets/upcoming-interactions/header'
});
