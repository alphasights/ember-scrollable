import Ember from 'ember';
import ModelsNavigationMixin from 'ember-cli-paint/mixins/models-navigation';

export default Ember.Controller.extend(ModelsNavigationMixin, {
  whiteboard: Ember.inject.controller('whiteboards/whiteboard'),

  navigableModels: Ember.computed.oneWay('whiteboard.arrangedProjects'),

  modelRouteParams: Ember.computed('whiteboard.modelRouteId', function () {
    return ['whiteboards.whiteboard.project', this.get('whiteboard.modelRouteId')];
  }),

  anglesSorting: ['createdAt:desc'],
  angles: Ember.computed.sort('model.angles', 'anglesSorting'),

  actions: {
    hideSidePanel: function() {
      this.transitionToRoute('whiteboards.whiteboard', this.get('whiteboard.modelRouteId'));
    }
  }
});
