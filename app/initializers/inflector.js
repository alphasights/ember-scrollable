import Ember from 'ember';

export default {
  name: 'inflector',

  initialize: function() {
    var inflector = Ember.Inflector.inflector;
    inflector.uncountable('projectHistory');
    inflector.uncountable('project-history');
    inflector.uncountable('project_history');
  }
};
