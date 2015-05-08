import InteractionsView from './interactions';

export default InteractionsView.extend({
  classNameBindings: [':upcoming-interactions'],

  name: 'Upcoming Interactions',

  listItemTemplateName: 'dashboard/widgets/upcoming-interactions/list-item',
  emptyMessage: 'You have no upcoming interactions.'
});
