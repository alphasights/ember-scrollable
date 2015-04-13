import DS from 'ember-data';

export default DS.Model.extend({
  startsAt: DS.attr('date'),
  endsAt: DS.attr('date'),
  projectId: DS.attr('number'),
  advisorId: DS.attr('number')
});
