import Ember from 'ember';
import ListWidgetComponent from 'phoenix/components/as-widget/list';

export default ListWidgetComponent.extend({
  classNameBindings: [':interactions', ':scheduled-interactions'],

  name: 'Scheduled Interactions',

  hasTeamMemberFilter: Ember.computed.oneWay('isTeamView'),
  listItemTemplateName: 'components/as-widget/scheduled-interactions/list-item',
  emptyMessage: 'no scheduled interactions.'
});
