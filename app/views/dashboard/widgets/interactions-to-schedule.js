import InteractionsView from './interactions';

export default InteractionsView.extend({
  classNameBindings: [':interactions-to-schedule'],

  name: 'Interactions To Schedule',

  listItemTemplateName: 'dashboard/widgets/interactions-to-schedule/list-item',
  emptyMessage: 'You have no interactions to schedule.'
});
