import WidgetView from '../widget';
import Ember from 'ember';

export default WidgetView.extend({
  classNameBindings: [':unused-advisors'],

  name: 'Unused Advisors',

  listItemTemplateName: 'dashboard/widgets/unused-advisors/list-item',
  emptyMessage: 'There are no unused advisors to contact.'
});
