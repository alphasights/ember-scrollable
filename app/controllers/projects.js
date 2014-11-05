import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['team'],
  team: Ember.computed.alias('controllers.team'),
  sortPropertyId: Ember.computed.alias('team.sortPropertyId'),

  availableSortProperties: [{
    id: 'priority',
    name: 'Priority',
    property: 'priority',
    ascending: false
  }, {
    id: 'client',
    name: 'Client Code',
    property: 'clientCode',
    ascending: true
  }, {
    id: 'creation-date',
    name: 'Creation Date',
    property: 'createdAt',
    ascending: false
  }],

  sortProperty: function() {
    return this.get('availableSortProperties').findBy('id', this.get('sortPropertyId'));
  }.property('sortPropertyId'),

  sortProperties: function() {
    return [this.get('sortProperty').property];
  }.property('sortProperty'),

  sortAscending: function() {
    return this.get('sortProperty').ascending;
  }.property('sortProperty')
});
