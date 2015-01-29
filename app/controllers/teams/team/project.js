import Ember from 'ember';
import ProjectProgress from 'phoenix/mixins/project-progress';

export default Ember.ObjectController.extend(ProjectProgress, {
  pistachioUrl: function() {
    return `${EmberENV.pistachioUrl}/projects/${this.get('id')}`;
  }.property('id'),

  anglesSorting: ['createdAt:desc'],
  angles: Ember.computed.sort('model.angles', 'anglesSorting')
});
