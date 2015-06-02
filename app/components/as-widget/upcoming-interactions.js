import Ember from 'ember';
import ListWidgetComponent from 'phoenix/components/as-widget/list';

export default ListWidgetComponent.extend({
  classNameBindings: [':interactions', ':upcoming-interactions'],

  name: 'Upcoming Interactions',

  hasTeamMemberFilter: Ember.computed.oneWay('isTeamView'),
  listItemTemplateName: 'components/as-widget/upcoming-interactions/list-item',
  emptyMessage: 'no upcoming interactions.'
});
