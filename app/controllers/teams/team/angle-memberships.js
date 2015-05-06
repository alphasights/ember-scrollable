import Ember from 'ember';
import PromiseController from '../../promise';

export default Ember.ObjectController.extend({
  needs: ['teams/team'],

  team: Ember.computed.oneWay('controllers.teams/team'),
  requestPromise: null,
  query: null,
  results: [],

  memberships: Ember.computed('model.memberships.[]', function() {
    // TODO: Remove the filterBy when https://github.com/emberjs/data/issues/2666 is fixed
    return this.get('model.memberships').sortBy('createdAt').filterBy('isDeleted', false);
  }),

  teamMembers: Ember.computed('requestPromise', 'team.members', 'results', function() {
    if (this.get('requestPromise')) {
      return this.get('results');
    } else {
      return this.get('team.members');
    }
  }),

  unusedTeamMembers: Ember.computed('teamMembers.[]', 'model.members.[]', function() {
    return _(this.get('teamMembers').toArray())
      .difference(this.get('model.members'));
  }),

  queryDidChange: Ember.observer('query', function() {
    var query = this.get('query');

    if (query && query.length > 1) {
      Ember.run.debounce(this, '_queryDidChange', 100);
    } else {
      this.set('requestPromise', null);
      this.set('results', []);
    }
  }),

  _queryDidChange: function() {
    var requestPromise = PromiseController.create({
      promise: this.store.find('user', { query: this.get('query') }).then(response => {
        if (requestPromise === this.get('requestPromise')) {
          this.set('results', response);
        }
      })
    });

    this.set('requestPromise', requestPromise);
  },

  actions: {
    add: function(user) {
      if (this.get('model.members').contains(user)) { return; }

      var membership = this.store.createRecord('angleTeamMembership', {
        user: user,
        angle: this.get('model'),
        project: this.get('model.project')
      });

      membership.save();
    },

    remove: function(membership) {
      membership.destroyRecord();
    }
  }
});
