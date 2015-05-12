import Ember from 'ember';
import ProjectsController from './whiteboard/projects';

export default Ember.ObjectController.extend({
  queryParams: {
    filterPriority: 'priority'
  },

  filterPriority: 'high',

  init: function() {
    this._super.apply(this, arguments);
    this.set('projects', ProjectsController.create({ whiteboard: this }));
  }
});
