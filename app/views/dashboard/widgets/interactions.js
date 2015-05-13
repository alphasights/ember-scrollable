import ListWidgetView from './list';
import Ember from 'ember';

export default ListWidgetView.extend({
  classNameBindings: [':interactions'],

  isTeamView: Ember.computed.oneWay('controller.isTeamView'),
  listItemTemplateName: null,
  headerTemplateName: 'dashboard/widgets/interaction/header'
});
