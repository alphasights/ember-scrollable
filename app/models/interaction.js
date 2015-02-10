import DS from 'ember-data';

export default DS.Model.extend({
  advisor: DS.belongsTo('advisor', { async: true }),
  clientContact: DS.belongsTo('clientContact', { async: true }),
  project: DS.belongsTo('project', { async: true }),
  scheduledCallTime: DS.attr('date'),

  pistachioUrl: function() {
    return `${EmberENV.pistachioUrl}/interactions/${this.get('id')}`;
  }.property()
});
