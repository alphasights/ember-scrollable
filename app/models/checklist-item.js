import DS from 'ember-data';

export default DS.Model.extend({
  createdAt: DS.attr('date'),
  completed: DS.attr('boolean'),
  interaction: DS.belongsTo('interaction'),
  title: DS.attr('string')
});
