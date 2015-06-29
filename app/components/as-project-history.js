import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':project-history'],

  projectHistory: null,

  actions: {
    openProject: function(project) {
      window.open(project.get('pistachioUrl'));
    }
  }
});
