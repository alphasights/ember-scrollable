import DS from 'ember-data';

export default DS.Model.extend({
  advisor: DS.belongsTo('advisor'),
  project: DS.belongsTo('project'),
  scheduledCallTime: DS.attr('date')
});
