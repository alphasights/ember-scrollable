import InteractionsController from './interactions';

export default InteractionsController.extend({
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

  arrangedContent: function() {
    var filter = this.get('filter');

    return this.get('model').filter((interaction) => {
      var scheduledCallTime = interaction.get('scheduledCallTime');

      return (!filter.startDate || scheduledCallTime >= filter.startDate) &&
             (!filter.endDate || scheduledCallTime <= filter.endDate);
    });
  }.property('filter', 'model'),

  initializeFilter: function() {
    this.set('filter', this.get('availableFilters.firstObject'));
  }.on('init'),

  actions: {
    setFilter: function(filter) {
      this.set('filter', filter);
    }
  }
});
