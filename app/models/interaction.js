import DS from 'ember-data';

export default DS.Model.extend({
  advisor: DS.belongsTo('advisor'),
  checklistItems: DS.hasMany('checklistItem'),
  clientContact: DS.belongsTo('clientContact'),
  project: DS.belongsTo('project'),
  scheduledCallTime: DS.attr('date')
});
