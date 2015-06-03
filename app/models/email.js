import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr('string'),
  cc: DS.attr(),
  recipients: DS.attr(),
  sender: DS.attr('string'),
  sentAt: DS.attr('date'),
  subject: DS.attr('string'),
  outgoing: DS.attr('boolean')
});
