import Advisor from './advisor';

export default Advisor.extend({
  project: DS.belongsTo('project'),
  termsSentAt: DS.attr('date')
})
