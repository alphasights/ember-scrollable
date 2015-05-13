import ListComponent from 'phoenix/components/as-widget/list';

export default ListComponent.extend({
  classNameBindings: [':interactions', ':upcoming-interactions'],

  name: 'Upcoming Interactions',

  listItemTemplateName: 'components/as-widget/upcoming-interactions/list-item',
  emptyMessage: 'You have no upcoming interactions.'
});
