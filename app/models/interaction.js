import DS from 'ember-data';

export default DS.Model.extend({
  advisor: DS.belongsTo('advisor'),
  checklistItems: DS.hasMany('checklistItem'),
  clientContact: DS.belongsTo('clientContact'),
  project: DS.belongsTo('project'),
  scheduledCallTime: DS.attr('date'),
  requestedAt: DS.attr('date'),

  scheduledCallDuration: moment.duration(60, 'minute'),

  pistachioUrl: function() {
    return `${EmberENV.pistachioUrl}/interactions/${this.get('id')}`;
  }.property('id'),

  checklistUrl: function() {
    return `${EmberENV.pistachioUrl}/projects/${this.get('project.id')}/proposal#checklist_${this.get('id')}`;
  }.property('id', 'project.id'),

  schedulingUrl: function() {
    return `${EmberENV.pistachioUrl}/projects/${this.get('project.id')}/proposal#scheduling_${this.get('id')}`;
  }.property('id', 'project.id')
});
