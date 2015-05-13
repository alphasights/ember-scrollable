import Ember from 'ember';
import InteractionComponent from 'phoenix/components/as-widget/interaction';

export default InteractionComponent.extend({
  classNameBindings: [':upcoming-interactions'],

  name: 'Upcoming Interactions',

  listItemTemplateName: 'components/as-widget/upcoming-interactions/list-item',
  emptyMessage: 'You have no upcoming interactions.'
});
