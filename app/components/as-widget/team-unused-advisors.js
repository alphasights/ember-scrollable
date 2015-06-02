import Ember from 'ember';
import ListWidgetComponent from 'phoenix/components/as-widget/list';

export default ListWidgetComponent.extend({
  classNameBindings: [':team-unused-advisors'],

  name: 'Unused Advisors',
  emptyMessage: 'no unused advisors to contact.',
  listItemTemplateName: 'components/as-widget/team-unused-advisors/list-item',
  hasTeamMemberFilter: false,
  teamMembers: null,

  model: Ember.computed('teamMembers', function() {
    return this.get('teamMembers').sortBy('deliveryPerformance.unusedAdvisorsCount').reverse();
  })
});
