import Ember from 'ember';
import InteractionsWidgetComponent from 'phoenix/components/as-widget/interactions';

export default InteractionsWidgetComponent.extend({
  classNameBindings: [':scheduled-interactions'],

  name: 'Scheduled Interactions',

  hasTeamMemberFilter: Ember.computed.oneWay('isTeamView'),
  listItemTemplateName: 'components/as-widget/scheduled-interactions/list-item',
  emptyMessage: 'no scheduled interactions.'
});
