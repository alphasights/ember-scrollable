import Ember from 'ember';
import InteractionComponent from 'phoenix/components/as-widget/interaction';

export default InteractionComponent.extend({
  classNameBindings: [':interactions-to-schedule'],

  name: 'Interactions To Schedule',

  listItemTemplateName: 'components/as-widget/interactions-to-schedule/list-item',
  emptyMessage: 'You have no interactions to schedule.'
});
