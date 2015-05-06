import DS from 'ember-data';

var TeamWhiteboard = Ember.Object.extend({
  team: null,
  name: Ember.computed.oneWay('team.name'),

  id: Ember.computed(function() {
    return `team-${this.get('team.id')}`;
  }),

  type: 'Teams'
});

export default DS.Model.extend({
  name: DS.attr('string'),
  office: DS.attr('string'),

  defaultWhiteboard: Ember.computed(function() {
    return TeamWhiteboard.create({
      team: this
    });
  })
});
