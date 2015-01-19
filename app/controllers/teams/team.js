import Ember from 'ember';

export default Ember.ObjectController.extend({
  queryParams: {
    sortPropertyId: 'sort_by'
  },

  sortPropertyId: 'priority'
});
