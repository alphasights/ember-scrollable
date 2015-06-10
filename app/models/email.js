import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations.Mixin, {
  subject: DS.attr('string'),
  body: DS.attr('string'),
  recipients: DS.attr('string'),
  from: DS.attr('string'),
  cc: DS.attr('string'),
  bcc: DS.attr('string'),
  concerningId: DS.attr('number')
});
