import DS from 'ember-data';

export default DS.Model.extend({
  advisor: DS.belongsTo('advisor'),
  clientContact: DS.belongsTo('clientContact'),
  project: DS.belongsTo('project'),
  scheduledCallTime: DS.attr('date'),

  pistachioUrl: function() {
    return `${EmberENV.pistachioUrl}/interactions/${this.get('id')}`;
  }.property()
});
