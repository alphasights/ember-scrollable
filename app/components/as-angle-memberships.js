import Ember from 'ember';
import PromiseController from 'phoenix/controllers/promise';

export default Ember.Component.extend({
  tagName: 'section',
  classNameBindings: [':angle-memberships'],
  store: Ember.inject.service(),

  whiteboard: null,
  requestPromise: null,
  query: null,
  results: [],

  memberships: Ember.computed('model.memberships.[]', function() {
    return this.get('model.memberships').sortBy('createdAt');
  }),

  members: Ember.computed('requestPromise', 'whiteboard.members', 'results', function() {
    if (this.get('requestPromise')) {
      return this.get('results');
    } else {
      return this.get('whiteboard.members');
    }
  }),

  unusedMembers: Ember.computed('members.[]', 'model.members.[]', function() {
    return _(this.get('members').toArray()).difference(this.get('model.members'));
  }),

  _queryDidChange: function(query) {
    var requestPromise = PromiseController.create({
      promise: this.get('store').find('user', { query: query }).then(response => {
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

      var membership = this.get('store').createRecord('angleTeamMembership', {
        user: user,
        angle: this.get('model'),
        project: this.get('model.project')
      });

      membership.save();
    },

    onSearchClick: function(event) {
      event.stopPropagation();
    },

    queryDidChange: function(query) {
      if (query && query.length > 1) {
        Ember.run.debounce(this, '_queryDidChange', query, 100);
      } else {
        this.set('requestPromise', null);
        this.set('results', []);
      }
    }
  }
});
