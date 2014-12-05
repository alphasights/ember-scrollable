import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':priority-select'],

  project: null,

  actions: {
    setPriority: function(value) {
      var project = this.get('project');

      project.set('priority', value);
      project.save();
    }
  }
});
