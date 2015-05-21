import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['currentUser'],
  currentUser: Ember.computed.oneWay('controllers.currentUser'),

  queryParams: {
    filterPriority: 'priority',
    scope: 'scope'
  },

  filterPriority: 'high',
  scope: null,

  projectScopes: [Ember.Object.create({
    name: 'Team',
    value: 'team'
  })],

  projectScopeSelection: Ember.computed('scope', 'projectScopes', {
    get: function() {
      var scope = this.get('scope');

      if (scope != null) {
        return this.get('projectScopes').findBy('value', scope);
      } else {
        return null;
      }
    },

    set: function(_, scope) {
      if (scope != null) {
        this.set('scope', scope.get('value'));
      } else {
        this.set('scope', null);
      }

      return scope;
    }
  }),

  actions: {
    showProject: function(project) {
      window.open(project.get('pistachioUrl'), '_blank');
    },
  }
});
