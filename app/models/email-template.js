import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  body: DS.attr('string'),
  subject: DS.attr('string'),
  creatorId: DS.attr('number'),
  purpose: DS.attr('string'),
  global: DS.attr('boolean')
});
