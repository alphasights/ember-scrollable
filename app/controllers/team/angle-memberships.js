import Ember from 'ember';
import PromiseController from '../promise';

export default Ember.ObjectController.extend({
  needs: ['team'],

  team: Ember.computed.alias('controllers.team'),
  requestPromise: null,
  query: null,

  memberships: function() {
    return this.get('model.memberships').sortBy('createdAt');
  }.property('model.memberships.[]'),

  teamMembers: function() {
    if (this.get('requestPromise')) {
      return this.get('results');
    } else {
      return this.get('team.members');
    }
  }.property('requestPromise', 'team.members'),

  queryDidChange: function() {
    if (Ember.isBlank(this.get('query'))) {
      this.set('requestPromise', null);
    }

    Ember.run.debounce(this, '_queryDidChange', 100);
  }.observes('query'),

  _queryDidChange: function() {
    var query = this.get('query');

    if (query && query.length > 1) {
      var requestPromise = PromiseController.create({
        promise: this.store.find('user', { query: query }).then(response => {
          if (requestPromise === this.get('requestPromise')) {
            this.set('results', response);
          }
        })
      });

      this.set('requestPromise', requestPromise);
    } else {
      this.set('results', null);
    }
  },

  actions: {
    add: function(user) {
      if (this.get('members').contains(user)) { return; }

      var membership = this.store.createRecord('angleTeamMembership', {
        user: user,
        angle: this.get('model'),
        project: this.get('project')
      });

      membership.save();
    },

    remove: function(membership) {
      membership.destroyRecord();
    }
  }
});
