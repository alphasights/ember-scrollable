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

  projectScopes: [{
    name: 'Company',
    value: 'company'
  }],

  projectScopeSelection: Ember.computed('scope', 'projectScopes.@each.value', {
    get: function() {
      var scope = this.get('scope');

      if (scope != null) {
        return this.get('projectScopes').findBy('value', scope);
      } else {
        return null;
      }
    },

    set: function(key, scope) {
      if (scope != null) {
        this.set('scope', scope.value);
      } else {
        this.set('scope', null);
      }
    }
  }),

  actions: {
    showProject: function(project) {
      window.open(project.get('pistachioUrl'), '_blank');
    },
  }
});
