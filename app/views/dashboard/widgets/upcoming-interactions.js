import InteractionsView from './interactions';

export default InteractionsView.extend({
  classNameBindings: [':upcoming-interactions'],
  name: 'Upcoming Interactions',
  headerTemplateName: 'dashboard/widgets/upcoming-interactions/header'
});
