import DS from 'ember-data';

var ChecklistItem = DS.Model.extend({
  completed: DS.attr('boolean'),
  interaction: DS.belongsTo('interaction'),
  type: DS.attr('string')
});

ChecklistItem.reopenClass({
  FIXTURES: [
    {
      id: 1,
      completed: true,
      interaction: 1909535,
      type: 'internal_profile_check'
    },
    {
      id: 2,
      completed: true,
      interaction: 1909535,
      type: 'advisor_vetting_test'
    },
    {
      id: 3,
      completed: false,
      interaction: 1909535,
      type: 'terms_of_engagement'
    }
  ]
});

export default ChecklistItem;
