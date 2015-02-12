import Ember from 'ember';

export default Ember.ArrayController.extend({
  availableFilters: [
    {
      name: 'Today',
      startDate: moment().startOf('day').toDate(),
      endDate: moment().endOf('day').toDate()
    },
    {
      name: 'Tomorrow',
      startDate: moment().startOf('day').add(1, 'days').toDate(),
      endDate: moment().endOf('day').add(1, 'days').toDate()
    },
    {
      name: 'All',
      endDate: null
    }
  ],

  arrangedContent: function() {
    var filter = this.get('filter');
    var model = this.get('model');

    if (filter.endDate == null) {
      return model;
    }

    return model.filter(function(interaction) {
      var callTime = interaction.get('scheduledCallTime');

      return (callTime >= filter.startDate) && (callTime <= filter.endDate);
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
