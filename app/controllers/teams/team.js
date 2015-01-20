import Ember from 'ember';
import ProjectsController from './team/projects';

export default Ember.ObjectController.extend({
  queryParams: {
    sortPropertyId: 'sort_by'
  },

  sortPropertyId: 'priority',

  init: function() {
    this._super.apply(this, arguments);
    this.set('projects', ProjectsController.create({ team: this }));
  }
});
