import DS from 'ember-data';

var ChecklistItem = DS.Model.extend({
  completed: DS.attr('boolean'),
  interaction: DS.belongsTo('interaction'),
  type: DS.attr('symbol')
});

ChecklistItem.reopenClass({
  FIXTURES: [
    {
      id: 1,
      completed: true,
      type: 'internalProfileCheck'
    },
    {
      id: 2,
      completed: true,
      type: 'advisorVettingTest'
    },
    {
      id: 3,
      completed: false,
      type: 'termsOfEngagement'
    }
  ]
});

export default ChecklistItem;
