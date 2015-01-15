import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['team'],

  team: Ember.computed.alias('controllers.team'),
  sortPropertyId: Ember.computed.alias('team.sortPropertyId'),
  arrangedContent: Ember.computed.sort('model', 'sortProperties'),

  availableSortProperties: [{
    id: 'client',
    name: 'Client',
    property: 'clientCode',
    order: 'asc'
  }, {
    id: 'creation-date',
    name: 'Creation Date',
    property: 'createdAt',
    order: 'desc'
  }],

  sortProperty: function() {
    return this
      .get('availableSortProperties')
      .findBy('id', this.get('sortPropertyId'));
  }.property('sortPropertyId'),

  sortProperties: function() {
    return [
      'priorityIndex:desc',
      `${this.get('sortProperty').property}:${this.get('sortProperty').order}`
    ];
  }.property('sortProperty'),
});
