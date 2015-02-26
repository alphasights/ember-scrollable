import InteractionsView from './interactions';

export default InteractionsView.extend({
  classNameBindings: [':interactions-to-schedule'],
  name: 'Interactions To Schedule',
  headerTemplateName: 'dashboard/widgets/interactions-to-schedule/header',
  listItemTemplateName: 'dashboard/widgets/interactions-to-schedule/list-item'
});
