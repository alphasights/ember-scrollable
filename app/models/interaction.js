import Ember from 'ember';
import DS from 'ember-data';

var Occurrence = Ember.Object.extend({
  interaction: null,
  duration: moment.duration(60, 'minute'),
  scheduledCallTime: Ember.computed.oneWay('interaction.scheduledCallTime'),
  title: 'Scheduled Call',

  time: function(key, value) {
    if (arguments.length > 1) {
      if (value != null) {
        this.set('scheduledCallTime', value.toDate());
      } else {
        this.set('scheduledCallTime', null);
      }
    }

    return moment(this.get('scheduledCallTime'));
  }.property('scheduledCallTime')
});

export default DS.Model.extend({
  advisor: DS.belongsTo('advisor'),
  checklistItems: DS.hasMany('checklistItem'),
  clientContact: DS.belongsTo('clientContact'),
  project: DS.belongsTo('project'),
  scheduledCallTime: DS.attr('date'),
  requestedAt: DS.attr('date'),

  occurrence: function() {
    if (this.get('scheduledCallTime') != null) {
      return Occurrence.create({ interaction: this });
    } else {
      return null;
    }
  }.property('scheduledCallTime'),

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
