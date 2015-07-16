import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  briefDescription: DS.attr('string'),
  limit: DS.attr('number'),
  owner: DS.belongsTo('user'),
  featureParticipations: DS.hasMany('featureParticipation'),
  testers: Ember.computed.mapBy('featureParticipations', 'user'),
  badgeName: DS.attr('string'),

  hasReachedLimit: Ember.computed('limit', 'featureParticipations.[]', function() {
    let limit = this.get('limit');

    return limit !== null && this.get('featureParticipations.length') >= limit;
  })
});
