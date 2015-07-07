import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  actioned: DS.attr('boolean'),
  advisor: DS.belongsTo('advisor'),
  checklistItems: DS.hasMany('checklistItem'),
  clientAccessNumberCountry: DS.attr('string'),
  clientContact: DS.belongsTo('clientContact'),
  additionalContactDetails: DS.attr('string'),
  paymentRequired: DS.attr('boolean'),
  primaryContact: DS.belongsTo('user'),
  project: DS.belongsTo('project'),
  requestedAt: DS.attr('date'),
  scheduledCallTime: DS.attr('date'),
  speak: DS.attr('boolean'),
  interactionType: DS.attr('string'),
  advisorPhoneCountryCode: DS.attr('string'),
  advisorPhoneNumber: DS.attr('string'),
  speakPhoneNumber: DS.attr('string'),
  speakCode: DS.attr('string'),
  used: DS.attr('boolean', { defaultValue: false }),
  hasAdvisorInvoice: DS.attr('boolean', { defaultValue: false }),

  hasIncompletePaymentSteps: Ember.computed('used', 'paymentRequired', 'hasAdvisorInvoice', function() {
    return this.get('used') === false ||
      (
        this.get('used') === true
        && this.get('paymentRequired') === true
        && this.get('hasAdvisorInvoice') === false
      );
  }),

  pistachioUrl: Ember.computed('id', function() {
    return `${EmberENV.pistachioUrl}/interactions/${this.get('id')}`;
  }),

  checklistUrl: Ember.computed('id', 'project.id', function() {
    return `${EmberENV.pistachioUrl}/projects/${this.get('project.id')}/proposal#checklist_${this.get('id')}`;
  }),

  schedulingUrl: Ember.computed('id', 'project.id', function() {
    return `${EmberENV.pistachioUrl}/projects/${this.get('project.id')}/proposal#scheduling_${this.get('id')}`;
  })
});
