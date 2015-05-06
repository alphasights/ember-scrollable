import Ember from 'ember';
import ProjectsController from './whiteboard/projects';

export default Ember.ObjectController.extend({
  queryParams: {
    sortPropertyId: 'sort_by'
  },

  sortPropertyId: 'creation-date',

  init: function() {
    this._super.apply(this, arguments);
    this.set('projects', ProjectsController.create({ whiteboard: this }));
  }
});
