import DS from 'ember-data';

export default DS.Model.extend({
  feature: DS.belongsTo('feature'),
  user: DS.belongsTo('user')
});
