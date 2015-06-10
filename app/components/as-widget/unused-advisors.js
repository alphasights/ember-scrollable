import ListWidgetComponent from 'phoenix/components/as-widget/list';
import notify from 'phoenix/helpers/notify';

export default ListWidgetComponent.extend({
  classNameBindings: [':unused-advisors'],

  name: 'Unused Advisors',
  emptyMessage: 'no unused advisors to contact.',
  hasTeamMemberFilter: false,
  listItemTemplateName: 'components/as-widget/unused-advisors/list-item',
  store: null,

  actions: {
    removeUnusedAdvisor: function(unusedAdvisorId) {
      if (window.confirm('Are you sure you want to remove the advisor from the list?')) {
        this.get('store').find('unusedAdvisor', unusedAdvisorId).then(function(unusedAdvisor) {
          unusedAdvisor.destroyRecord().then(function() {
            notify(`The advisor ${unusedAdvisor.get('name')} was removed from the list`);
          });
        });
      }
    }
  }
});
