import Ember from 'ember';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';

export default Ember.Controller.extend(ModelsNavigationMixin, {
  needs: ['whiteboards/whiteboard'],
  whiteboard: Ember.computed.oneWay('controllers.whiteboards/whiteboard'),

  navigableModels: Ember.computed.oneWay('whiteboard.projects.arrangedContent'),

  modelRouteParams: Ember.computed('whiteboard.model.id', function () {
    return ['whiteboards.whiteboard.project', this.get('whiteboard.model.id')];
  }),

  anglesSorting: ['createdAt:desc'],
  angles: Ember.computed.sort('model.angles', 'anglesSorting'),

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('whiteboards.whiteboard', this.get('whiteboard.model.id'));
    }
  }
});
