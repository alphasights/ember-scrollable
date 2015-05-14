import ListWidgetComponent from 'phoenix/components/as-widget/list';

export default ListWidgetComponent.extend({
  classNameBindings: [':interactions', ':interactions-to-schedule'],

  name: 'Interactions To Schedule',

  listItemTemplateName: 'components/as-widget/interactions-to-schedule/list-item',
  emptyMessage: 'You have no interactions to schedule.'
});
