import ListWidgetView from './list';

export default ListWidgetView.extend({
  classNameBindings: [':unused-advisors'],

  name: 'Unused Advisors',
  listItemTemplateName: 'dashboard/widgets/unused-advisors/list-item',
  emptyMessage: 'There are no unused advisors to contact.'
});
