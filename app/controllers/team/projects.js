import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['team'],

  team: Ember.computed.alias('controllers.team'),
  sortPropertyId: Ember.computed.alias('team.sortPropertyId'),
  sortedProjects: Ember.computed.sort('model', 'sortProperties'),

  availableSortProperties: [{
    id: 'client',
    name: 'Client',
    property: 'clientCode',
    ascending: true
  }, {
    id: 'creation-date',
    name: 'Creation Date',
    property: 'createdAt',
    ascending: false
  }],

  sortProperty: function() {
    return this
      .get('availableSortProperties')
      .findBy('id', this.get('sortPropertyId'));
  }.property('sortPropertyId'),

  sortProperties: function() {
    return ['priority:asc', this.get('sortProperty').property];
  }.property('sortProperty'),

  sortAscending: function() {
    return ['priority:asc', this.get('sortProperty').ascending];
  }.property('sortProperty')
});
