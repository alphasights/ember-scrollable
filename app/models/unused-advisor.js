import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.belongsTo('project'),
  termsSentAt: DS.attr('date'),
  advisor: DS.belongsTo('advisor')
});
