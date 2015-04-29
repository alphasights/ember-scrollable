import DS from 'ember-data';

export default DS.Model.extend({
  startsAt: DS.attr('date'),
  endsAt: DS.attr('date'),
  interactionId: DS.attr('number'),
  title: DS.attr('string'),
  type: DS.attr('string')
});
