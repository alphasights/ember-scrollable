import DS from 'ember-data';

export default DS.Model.extend({
  startsAt: DS.attr('date'),
  endsAt: DS.attr('date'),

  type: 'alpha-call',
  title: Ember.computed.oneWay('alpha-call'),

  time: function() {
    return moment(this.get('startsAt'));
  }.property('startsAt'),

  endingTime: function() {
    return moment(this.get('endsAt'));
  }.property('endsAt'),

  duration: function() {
    return moment.duration(moment(this.get('endingTime')).diff(this.get('time')));
  }.property('time', 'endingTime')
});
