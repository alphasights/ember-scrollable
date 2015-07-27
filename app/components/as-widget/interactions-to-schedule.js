import Ember from 'ember';
import InteractionsWidgetComponent from 'phoenix/components/as-widget/interactions';

export default InteractionsWidgetComponent.extend({
  classNameBindings: [':interactions-to-schedule'],

  name: 'Interactions To Schedule',

  hasTeamMemberFilter: Ember.computed.oneWay('isTeamView'),
  listItemTemplateName: 'components/as-widget/interactions-to-schedule/list-item',
  emptyMessage: 'no interactions to schedule.'
});
