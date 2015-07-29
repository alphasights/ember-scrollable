import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  briefDescription: DS.attr('string'),
  limit: DS.attr('number'),
  owner: DS.belongsTo('user'),
  featureParticipationsCount: DS.attr('number'),
  badgeName: DS.attr('string'),

  hasReachedLimit: Ember.computed('limit',  'featureParticipationIdsCount', function() {
    let limit = this.get('limit');

    return limit !== null && this.get('featureParticipationsCount') >= limit;
  })
});
