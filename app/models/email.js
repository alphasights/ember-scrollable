import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr('string'),
  cc: DS.attr(),
  from: DS.attr(),
  recipients: DS.attr(),
  sentAt: DS.attr('date'),
  subject: DS.attr('string'),
  outgoing: DS.attr('boolean')
});
