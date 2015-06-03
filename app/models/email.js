import DS from 'ember-data';

export default DS.Model.extend({
  subject: DS.attr('string'),
  body: DS.attr('string'),
  recipients: DS.attr('string'),
  from: DS.attr('string'),
  concerningId: DS.attr('number')
});
