import DS from 'ember-data';

export default DS.Model.extend({
  actioned: DS.attr('boolean'),
  advisor: DS.belongsTo('advisor'),
  checklistItems: DS.hasMany('checklistItem'),
  clientAccessNumberCountry: DS.attr('string'),
  clientContact: DS.belongsTo('clientContact'),
  additionalContactDetails: DS.attr('string'),
  project: DS.belongsTo('project'),
  requestedAt: DS.attr('date'),
  scheduledCallTime: DS.attr('date'),
  speak: DS.attr('boolean'),
  interactionType: DS.attr('string'),
  advisorPhoneCountryCode: DS.attr('string'),
  advisorPhoneNumber: DS.attr('string'),

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
