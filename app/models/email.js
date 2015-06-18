import DS from 'ember-data';

export default DS.Model.extend({
  bcc: DS.attr(),
  body: DS.attr('string'),
  cc: DS.attr(),
  concerningId: DS.attr('number'),
  concerningType: DS.attr('string'),
  from: DS.attr('string'),
  outgoing: DS.attr('boolean'),
  recipients: DS.attr(),
  sentAt: DS.attr('date'),
  subject: DS.attr('string')
});
