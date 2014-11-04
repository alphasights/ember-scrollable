import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortByProperties: [{
    value: 'clientCode',
    label: 'Client'
  }, {
    value: 'priority',
    label: 'Priority'
  }, {
    value: 'createdAt',
    label: 'Creation Date'
  }],

  sortBy: 'priority',

  arrangedContent: function() {
    return this.get('model').sortBy(this.get('sortBy'));
  }.property('sortBy')
});
