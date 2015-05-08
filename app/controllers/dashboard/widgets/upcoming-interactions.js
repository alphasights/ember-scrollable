import Ember from 'ember';
import ListController from './list';

export default ListController.extend({
  availableFilters: [
    {
      name: 'All',
      startDate: null,
      endDate: null
    },
    {
      name: 'Today',
      startDate: moment().startOf('day').toDate(),
      endDate: moment().endOf('day').toDate()
    },
    {
      name: 'Tomorrow',
      startDate: moment().startOf('day').add(1, 'days').toDate(),
      endDate: moment().endOf('day').add(1, 'days').toDate()
    }
  ],

  arrangedContent: Ember.computed('filter', 'model', function() {
    var filter = this.get('filter');

    return this.get('model').filter((interaction) => {
      var scheduledCallTime = interaction.get('scheduledCallTime');

      return (!filter.startDate || scheduledCallTime >= filter.startDate) &&
             (!filter.endDate || scheduledCallTime <= filter.endDate);
    });
  }),

  initializeFilter: Ember.on('init', function() {
    this.set('filter', this.get('availableFilters.firstObject'));
  }),

  actions: {
    setFilter: function(filter) {
      this.set('filter', filter);
    }
  }
});
