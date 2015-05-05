import Ember from 'ember';

export default Ember.ArrayController.extend({
  team: null,
  sortPropertyId: Ember.computed.oneWay('team.sortPropertyId'),
  arrangedContent: Ember.computed.sort('content', 'sortProperties'),

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

  sortProperties: Ember.computed('sortProperty', function() {
    return [
      'priorityIndex:desc',
      `${this.get('sortProperty').property}:${this.get('sortProperty').order}`
    ];
  }),

  sortAscending: Ember.computed('sortProperty', function() {
    return this.get('sortProperty').ascending;
  }),

  sortProperty: Ember.computed('sortPropertyId', function() {
    return this
      .get('availableSortProperties')
      .findBy('id', this.get('sortPropertyId'));
  })
});
