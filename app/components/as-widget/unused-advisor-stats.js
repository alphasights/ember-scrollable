import Ember from 'ember';
import ListWidgetComponent from 'phoenix/components/as-widget/list';

export default ListWidgetComponent.extend({
  classNameBindings: [':unused-advisors'],

  name: 'Unused Advisors',
  emptyMessage: 'There are no unused advisors to contact.',
  listItemTemplateName: 'components/as-widget/unused-advisor-stats/list-item',
  hasTeamMemberFilter: false,
  teamMembers: null,

  model: Ember.computed('teamMembers', function() {
    return this.get('teamMembers').sortBy('deliveryPerformance.unusedAdvisorsCount').reverse();
  })
});
