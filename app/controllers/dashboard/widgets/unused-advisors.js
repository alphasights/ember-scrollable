import ListWidgetController from './list';
import notify from 'phoenix/helpers/notify';

export default ListWidgetController.extend({
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
