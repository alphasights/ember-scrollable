import DS from 'ember-data';

export default DS.Model.extend({
  currentMonthCreditCount: DS.attr('number'),
  monthlyTarget: DS.attr('number'),
  user: DS.belongsTo('user')
});
