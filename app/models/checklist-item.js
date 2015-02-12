import DS from 'ember-data';

export default DS.Model.extend({
  completed: DS.attr('boolean'),
  interaction: DS.belongsTo('interaction'),
  type: DS.attr('symbol')
});
