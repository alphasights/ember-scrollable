import DS from 'ember-data';

export default DS.Model.extend({
  startsAt: DS.attr('date'),
  endsAt: DS.attr('date'),
  interactionId: DS.attr('number')
});
