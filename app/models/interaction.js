import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  actioned: DS.attr('boolean'),
  advisor: DS.belongsTo('advisor', { async: false }),
  checklistItems: DS.hasMany('checklistItem', { async: false }),
  clientAccessNumberCountry: DS.attr('string'),
  clientContact: DS.belongsTo('clientContact', { async: false }),
  additionalContactDetails: DS.attr('string'),
  interactionCompletions: DS.hasMany('interactionCompletion', { async: false }),
  paymentRequired: DS.attr('boolean'),
  primaryContact: DS.belongsTo('user', { async: false }),
  project: DS.belongsTo('project', { async: false }),
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

  hasIncompleteChecklistItems: Ember.computed('checklistItems.@each.completed', function() {
    return this.get('checklistItems.length') > 0 &&
      _.some(this.get('checklistItems').toArray(), function(checklistItem) {
        return !checklistItem.get('completed');
      });
  }),

  hasIncompletePaymentSteps: Ember.computed('used', 'paymentRequired', 'hasAdvisorInvoice', function() {
    return this.get('used') === false ||
      (
        this.get('used') === true &&
        this.get('paymentRequired') === true &&
        this.get('hasAdvisorInvoice') === false
      );
  }),

  validInteractionCompletion: Ember.computed('interactionCompletions.[]', function() {
    return this.get('interactionCompletions')
      .filterBy('voidedAt', null)
      .sortBy('createdAt')
      .get('lastObject');
  }),

  pistachioUrl: Ember.computed('id', function() {
    return `${EmberENV.pistachioUrl}/interactions/${this.get('id')}`;
  }),

  checklistUrl: Ember.computed('id', 'project.id', function() {
    return `${EmberENV.pistachioUrl}/projects/${this.get('project.id')}/proposal#checklist_${this.get('id')}`;
  }),

  schedulingUrl: Ember.computed('id', 'project.id', function() {
    return `${EmberENV.pistachioUrl}/projects/${this.get('project.id')}/proposal#scheduling_${this.get('id')}`;
  }),

  invitationUrl: Ember.computed('id', 'project.id', function() {
    return `${EmberENV.pistachioUrl}/projects/${this.get('project.id')}/proposal#invitation_${this.get('id')}`;
  }),
});
