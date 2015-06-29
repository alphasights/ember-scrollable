import DS from 'ember-data';

export default DS.Model.extend({
  bcc: DS.attr('string'),
  body: DS.attr('string'),
  cc: DS.attr('string'),
  concerningId: DS.attr('number'),
  concerningType: DS.attr('string'),
  from: DS.attr('string'),
  recipients: DS.attr('string'),
  subject: DS.attr('string')
});
