import DS from 'ember-data';

export default DS.Model.extend({
  createdAt: DS.attr('date'),
  completed: DS.attr('boolean'),
  interaction: DS.belongsTo('interaction', { async: false }),
  title: DS.attr('string')
});
